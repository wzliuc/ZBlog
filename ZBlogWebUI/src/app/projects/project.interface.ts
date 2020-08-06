export interface ProjectGroup {
    id: number;
    organisationName: string;
    projects: Project[];
}

export interface Project {
    name: string;
    pdfName: string;
}