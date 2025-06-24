import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
  } from "react";
  import {
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  } from "../services/ProjectService";
  import { Project } from "../types/project";
  
  interface ProjectContextType {
    projects: Project[];
    createProject: (project: Project) => Promise<void>;
    getProjects: () => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    getProject: (id: string) => Promise<Project | undefined>;
    updateProject: (id: string, project: Project) => Promise<void>;
  }
  
  export const ProjectContext = createContext<ProjectContextType | undefined>(
    undefined
  );
  
  export const useProject = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
      throw new Error("useProject debe estar dentro de un ProjectProvider");
    }
    return context;
  };
  
  interface ProjectProviderProps {
    children: ReactNode;
  }
  
  export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
  
    const createProjectRequest = useCallback(async (project: Project) => {
      try {
        const res = await createProject(project);
        if (res && res.data) {
          setProjects((prevProjects) => [...prevProjects, res.data]);
        }
      } catch (error) {
        console.error("Error al crear el proyecto:", error);
      }
    }, []);
  
    const getProjectsRequest = useCallback(async () => {
      try {
        const res = await getProjects();
        if (res && res.data) {
          setProjects(res.data);
        }
      } catch (error) {
        console.error("Proyectos no encontrados:", error);
      }
    }, []);
  
    const deleteProjectRequest = useCallback(async (id: string) => {
      try {
        const res = await deleteProject(id);
        if (res?.status === 204) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.code !== id)
          );
        }
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
      }
    }, []);
  
    const getProjectRequest = useCallback(
      async (id: string): Promise<Project | undefined> => {
        try {
          const res = await getProject(id);
          if (res && res.data) {
            return res.data;
          }
        } catch (error) {
          console.error("Proyecto no encontrado:", error);
        }
      },
      []
    );
  
    const updateProjectRequest = useCallback(
      async (id: string, project: Project) => {
        try {
          const res = await updateProject(id, project);
          if (res && res.data) {
            setProjects((prevProjects) =>
              prevProjects.map((p) => (p.code === id ? res.data : p))
            );
          }
        } catch (error) {
          console.error("Error al actualizar el proyecto:", error);
        }
      },
      []
    );
  
    return (
      <ProjectContext.Provider
        value={{
          projects,
          createProject: createProjectRequest,
          getProjects: getProjectsRequest,
          deleteProject: deleteProjectRequest,
          getProject: getProjectRequest,
          updateProject: updateProjectRequest,
        }}
      >
        {children}
      </ProjectContext.Provider>
    );
  };
  