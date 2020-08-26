export interface Description {
    intro: string;
    bulletPoints: string[];
}

export interface Experience {
    id: number;
    companyName: string;
    role: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: Description[];
    flag: string;
    imgUrl: string;
}

export interface Education {
    id: number;
    uniName: string;
    degree: string;
    courseName: string;
    location: string;
    flag: string;
    award: string;
    startDate: Date;
    endDate: Date;
    subjects: string[];
    imgCaption: string;
    imgUrl: string;
}

export interface Skill {
    id: number;
    type: string;
    skillSets: SkillSet[];
    imgUrl: string;
}

export interface SkillSet {
    name: string;
    skills: string[];
}