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
    10 : "Full Stack Development",
    11 : "Quality Assurance",
    12 : "Blockchain Development",
}