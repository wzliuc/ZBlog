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
    uniName: string;
    degree: string;
    courseName: string;
    location: string;
    startDate: Date;
    endDate: Date | string;
    award: string;
    subjects: string[];
    imgUrl: string;
    flag: string;
    imgCaption: string;
}

export interface Skill {
    type: string;
    skillSets: SkillSet[];
    imgUrl: string;
}

export interface SkillSet {
    name: string;
    skills: string[];
}