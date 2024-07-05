"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { SupbaseContext } from "./SupbaseProvider";
import { User } from "@supabase/supabase-js";
import { uuidv4 } from "../utils";
import Loader from "../Loading/Loader";
import { Toaster } from "react-hot-toast";

interface AppInterface {
    currentUser : User | null;
    openDomainDialog : boolean;
    startLoader : () => string;
    completeLoader : (processId : string) => void;
    toggleDomainSelectionDialogBox : () => void;
    closeDialogBox : () => void;
}

const AppContext = createContext<AppInterface>({
    currentUser : null,
    openDomainDialog : false,
    startLoader: () => "",
    completeLoader: console.log,
    toggleDomainSelectionDialogBox : () => {},
    closeDialogBox : () => {}
});

export function useApp(){
    return useContext(AppContext);
}

export default function AppProvider({ children }: React.PropsWithChildren) {
  const supabase = useContext(SupbaseContext);
  const [openDomainDialog,setOpenDomainDialogBox] = useState<boolean>(false);
  const [loadingProcesses, setLoadingProcesses] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function toggleDomainSelectionDialogBox(){
    setOpenDomainDialogBox(prev => !prev);
  }

  function closeDialogBox(){
    setOpenDomainDialogBox(false);
  }

  const getUser = async () => {
    if (supabase !== null) {
      const loaderId = startNewLoadingProcess();
      try{
        const data = await supabase.auth.getUser();
        setCurrentUser(data?.data.user);
        console.log(data?.data.user);
      }
      catch (error) {
        console.log(error);
      } finally {
        markLoadingCompleted(loaderId);
      }
    }
  };

  useEffect(() => {
    getUser();
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
    <AppContext.Provider value={{currentUser,openDomainDialog,toggleDomainSelectionDialogBox,closeDialogBox,startLoader: startNewLoadingProcess,
      completeLoader: markLoadingCompleted}}>
        {children}
        <Toaster position="bottom-center" />
        {loadingProcesses.length > 0 && <Loader />}
    </AppContext.Provider>
  )
}
