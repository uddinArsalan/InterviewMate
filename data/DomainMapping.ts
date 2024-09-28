import { domainTypes } from "@/interfaces"

interface DomainMapType {
    [key : number] : domainTypes;
}
export const DomainMap : DomainMapType = {
    1 : "Frontend Web Development",
    2 : "Backend Web Development",
    3 : "Mobile App Development",
    4 : "Data Science",
    5 : "Machine Learning Engineering",
    6 : "DevOps",
    7 : "Cloud Computing",
    8 : "Cybersecurity",
    9 : "UI/UX Design",
    10 : "Blockchain Development",
    11 : "Full Stack Development",
    12 : "Quality Assurance",
}