"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { formatDate, uuidv4 } from "../utils";
import Loader from "../app/Loading/Loader";
import { Toaster,toast } from "react-hot-toast";
import { getExistingUser,getCurrentUser } from "@/lib/db";

import { useSupabase } from "./SupabaseProvider";
import { domainTypes } from "@/interfaces";

interface AppInterface {
  currentUser: User | null;
  openDomainDialog: boolean;
  startLoader: () => string;
  completeLoader: (processId: string) => void;
  toggleDomainSelectionDialogBox: () => void;
  closeDialogBox: () => void;
  domainValue : domainTypes;
  updateDomainValue : (domain : domainTypes) => void;
  interviewSessionId : number,
  updateInterviewSessionId : (interviewId : number) => void;
  characterVoice : string;
  updateCharacterVoice : (characterVoice : string) => void;
  questionIds : number[];
  updateQuestionIdArray : (questionId : number) => void,
  isAudioOn : boolean,
  isVideoOn : boolean,
  toggleAudio : () => void;
  toggleVideo : () => void;
}

const AppContext = createContext<AppInterface>({
  currentUser: null,
  openDomainDialog: false,
  startLoader: () => "",
  completeLoader: console.log,
  toggleDomainSelectionDialogBox: () => {},
  closeDialogBox: () => {},
  domainValue : "Frontend Web Development",
  updateDomainValue : console.log,
  interviewSessionId : 0,
  updateInterviewSessionId : console.log,
  characterVoice : "",
  updateCharacterVoice : console.log,
  questionIds : [],
  updateQuestionIdArray : console.log,
  isAudioOn : false,
  isVideoOn : false,
  toggleAudio : () => {},
  toggleVideo : () => {}
});

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider({ children }: React.PropsWithChildren) {
  const [openDomainDialog, setOpenDomainDialogBox] = useState<boolean>(false);
  const [loadingProcesses, setLoadingProcesses] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [domainValue,setDomainValue] = useState<domainTypes>("Frontend Web Development");
  const [interviewSessionId,setInterviewSessionId] = useState<number>(0);
  const [characterVoice,setCharacterVoice] = useState<string>("");
  const [questionIds,setQuestionIds] = useState<number[]>([]);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const { supabase } = useSupabase();

  function toggleDomainSelectionDialogBox() {
    setOpenDomainDialogBox((prev) => !prev);
  }

  function closeDialogBox() {
    setOpenDomainDialogBox(false);
  }

  function toggleAudio(){
    setIsAudioOn(prevAudio => !prevAudio)
  }

  function toggleVideo(){
    setIsVideoOn(prevVideo => !prevVideo)
  }

  function updateDomainValue(domain : domainTypes){
    setDomainValue(domain)
  }

  function updateInterviewSessionId(interviewId : number) {
      setInterviewSessionId(interviewId);
  }

  function updateCharacterVoice(characterVoice:string) {
    setCharacterVoice(characterVoice)
  }

  function updateQuestionIdArray(questionId : number){
    setQuestionIds(prevIds => ([...prevIds,questionId]));
  }

  async function getUser() {
    if (supabase) {
      const loaderId = startNewLoadingProcess();
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      } finally {
        markLoadingCompleted(loaderId);
      }
    }
  }

  async function insertUserData(user: User) {
    if (!supabase || !user) return;
  
    const loaderId = startNewLoadingProcess();
    try {
      const username = user.user_metadata?.full_name || user.email;
  
      const { data: userId, error: userIdError } = await supabase.rpc(
        "uuid_to_bigint",
        { uuid: user.id }
      );
  
      if (userIdError) throw userIdError;
  
      await supabase.rpc("set_app_user_id", { p_user_id: userId });
  
      let existingUser;
      try {
        existingUser = await getExistingUser(userId);
      } catch (error) {
        console.error("Error checking for existing user:", error);
      }
  
      if (existingUser) {
        console.log("User already exists");
        return;
      }
  
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            id: userId,
            username: username,
            created_at: formatDate(new Date()),
          },
        ])
        .select();
  
      if (error) throw error;
  
      console.log("User data inserted successfully", data);
    } catch (error) {
      console.error("Error inserting user data:", error);
    } finally {
      await supabase.rpc("clear_app_user_id");
      markLoadingCompleted(loaderId);
    }
  }
  
  useEffect(() => {
    async function initializeUser() {
      const user = await getUser();
      if (user) {
        toast.success("User authenticated successfully");
        await insertUserData(user);
      }
    }
    initializeUser();
  }, [supabase]);

  function startNewLoadingProcess() {
    const loadingProcessId = uuidv4();
    setLoadingProcesses((existing) => {
      existing.push(loadingProcessId);
      return existing;
    });
    return loadingProcessId;
  }

  function markLoadingCompleted(processId: string) {
    setLoadingProcesses((existing) => {
      return existing.filter((x) => x !== processId);
    });
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        openDomainDialog,
        toggleDomainSelectionDialogBox,
        closeDialogBox,
        startLoader: startNewLoadingProcess,
        completeLoader: markLoadingCompleted,
        domainValue,
        updateDomainValue,
        interviewSessionId,
        updateInterviewSessionId,
        characterVoice,
        updateCharacterVoice,
        questionIds,
        updateQuestionIdArray,
        isAudioOn,
        isVideoOn,
        toggleAudio,
        toggleVideo
      }}
    >
      {children}
      <Toaster position="bottom-center" />
      {loadingProcesses.length > 0 && <Loader />}
    </AppContext.Provider>
  );
}
