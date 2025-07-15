import { RequestHandler } from "express";
import { ProjectDetails } from "../models/projectDetailsModel";
import { Project } from "../models/projectModel";

export const getAllProjectDetails: RequestHandler = async (req, res) => {
  try {
    const projectDetails = await ProjectDetails.find();
    res.json(projectDetails);
  } catch (error) {
    console.error("Error al obtener detalles del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProjectDetails: RequestHandler = async (req, res) => {
  try {
    const projectDetailsFound = await ProjectDetails.findById(req.params.id);
    if (!projectDetailsFound) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" });
      return;
    }
    res.json(projectDetailsFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectDetails: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const details = await ProjectDetails.find({ projectId });
    res.json(details);
  } catch (error) {
    console.error("Error al obtener los detalles del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProjectDetailsByCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado con ese código" })
      return;
    }

    const details = await ProjectDetails.findOne({ projectId: project._id });
    if (!details) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" })
      return;
    }

    res.json(details);
  } catch (error) {
    console.error("Error al obtener detalles por código", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createProjectDetails: RequestHandler = async (req, res) => {
  try {
    const {
      projectId,
      projectOwner,
      typeDocument,
      documentNumber,
      address,
      location,
      city,
      department,
      contactPerson,
      solarPanels,
      inverters,
      batteries,
    } = req.body;

    const existing = await ProjectDetails.findOne({ projectId });
    if (existing) {
      res
        .status(400)
        .json({ error: "Ya existen los detalles de este proyecto" });
      return;
    }

    const dcPower =
      (solarPanels || []).reduce((total: number, panel: any) => {
        return total + (panel.panelPower || 0) * (panel.numberPanels || 0);
      }, 0) / 1000;

    const acPower = (inverters || []).reduce((total: number, inverter: any) => {
      return total + (inverter.inverterPower || 0) * (inverter.numberInverter || 0);
    }, 0);

    const newProjectDetails = new ProjectDetails({
      projectId,
      projectOwner,
      typeDocument,
      documentNumber,
      address,
      location,
      city,
      department,
      dcPower,
      acPower,
      contactPerson: contactPerson || [],
      solarPanels: solarPanels || [],
      inverters: inverters || [],
      batteries: batteries || [],
    });

    const saved = await newProjectDetails.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear ProjectDetails", error);
    res.status(500).json({ error: "Error al crear ProjectDetails" });
  }
};

export const addContactPerson: RequestHandler = async (req, res) => {
  try {
    const project = await ProjectDetails.findOne({
      projectId: req.params.projectId,
    });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    project.contactPerson.push(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar contacto" });
  }
};

export const addSolarPanel: RequestHandler = async (req, res) => {
  try {
    const project = await ProjectDetails.findOne({
      projectId: req.params.projectId,
    });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    project.solarPanels.push(req.body);

    project.dcPower =
      project.solarPanels.reduce((total, panel) => {
        return total + (panel.panelPower || 0) * (panel.numberPanels || 0);
      }, 0) / 1000;

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar panel solar" });
  }
};

export const addInverter: RequestHandler = async (req, res) => {
  try {
    const project = await ProjectDetails.findOne({
      projectId: req.params.projectId,
    });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    project.inverters.push(req.body);

    project.acPower = project.inverters.reduce((total, inverter) => {
      return total + (inverter.inverterPower || 0) * (inverter.numberInverter || 0);
    }, 0);

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar inversor" });
  }
};

export const addBattery: RequestHandler = async (req, res) => {
  try {
    const project = await ProjectDetails.findOne({
      projectId: req.params.projectId,
    });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    project.batteries.push(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar batería" });
  }
};
export const updateProjectDetails: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await ProjectDetails.findById(id);
    if (!project) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" });
      return;
    }

    Object.assign(project, updates);

    if (updates.inverters) {
      project.acPower = updates.inverters.reduce((total: number, inverter: any) => {
        return total + (inverter.inverterPower || 0) * (inverter.numberInverter || 0);
      }, 0);
    }

    if (updates.solarPanels) {
      project.dcPower =
        updates.solarPanels.reduce((total: number, panel: any) => {
          return total + (panel.panelPower || 0) * (panel.numberPanels || 0);
        }, 0) / 1000;
    }

    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar ProjectDetails", error);
    res.status(500).json({ error: "Error al actualizar ProjectDetails" });
  }
};

export const updateContactPerson: RequestHandler = async (req, res) => {
  try {
    const { projectId, contactId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const contact = project.contactPerson.id(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contacto no encontrado" });
      return;
    }

    Object.assign(contact, req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar contacto" });
  }
};

export const updateSolarPanel: RequestHandler = async (req, res) => {
  try {
    const { projectId, panelId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const panel = project.solarPanels.id(panelId);
    if (!panel) {
      res.status(404).json({ message: "Panel solar no encontrado" });
      return;
    }

    Object.assign(panel, req.body);

    project.dcPower =
      project.solarPanels.reduce((total, panel) => {
        return total + (panel.panelPower || 0) * (panel.numberPanels || 0);
      }, 0) / 1000;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar panel solar" });
  }
};

export const updateInverter: RequestHandler = async (req, res) => {
  try {
    const { projectId, inverterId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const inverter = project.inverters.id(inverterId);
    if (!inverter) {
      res.status(404).json({ message: "Inversor no encontrado" });
      return;
    }

    Object.assign(inverter, req.body);

    project.acPower = project.inverters.reduce((total, inverter) => {
      return total + (inverter.inverterPower || 0) * (inverter.numberInverter || 0);
    }, 0);

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar inversor" });
  }
};

export const updateBattery: RequestHandler = async (req, res) => {
  try {
    const { projectId, batteryId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const battery = project.batteries.id(batteryId);
    if (!battery) {
      res.status(404).json({ message: "Batería no encontrada" });
      return;
    }

    Object.assign(battery, req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar batería" });
  }
};

export const deleteProjectDetails: RequestHandler = async (req, res) => {
  try {
    const detailsDelete = await ProjectDetails.findByIdAndDelete(req.params.id);
    if (!detailsDelete) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" });
      return;
    }
    res.json(detailsDelete);
  } catch (error) {
    console.log(error);
  }
};

export const deleteContactPerson: RequestHandler = async (req, res) => {
  try {
    const { projectId, contactId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const contact = project.contactPerson.id(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contacto no encontrado" });
      return;
    }

    project.contactPerson.pull(contact._id);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar contacto" });
  }
};

export const deleteSolarPanel: RequestHandler = async (req, res) => {
  try {
    const { projectId, panelId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const panel = project.solarPanels.id(panelId);
    if (!panel) {
      res.status(404).json({ message: "Panel solar no encontrado" });
      return;
    }

    project.solarPanels.pull(panel._id);

    project.dcPower =
      project.solarPanels.reduce((total, panel) => {
        return total + (panel.panelPower || 0) * (panel.numberPanels || 0);
      }, 0) / 1000;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar panel solar" });
  }
};

export const deleteInverter: RequestHandler = async (req, res) => {
  try {
    const { projectId, inverterId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const inverter = project.inverters.id(inverterId);
    if (!inverter) {
      res.status(404).json({ message: "Inversor no encontrado" });
      return;
    }

    project.inverters.pull(inverter._id);

    project.acPower = project.inverters.reduce((total, inverter) => {
      return total + (inverter.inverterPower || 0) * (inverter.numberInverter || 0);
    }, 0);

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar inversor" });
  }
};

export const deleteBattery: RequestHandler = async (req, res) => {
  try {
    const { projectId, batteryId } = req.params;
    const project = await ProjectDetails.findOne({ projectId });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const battery = project.batteries.id(batteryId);
    if (!battery) {
      res.status(404).json({ message: "Batería no encontrada" });
      return;
    }

    project.batteries.pull(battery._id);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar batería" });
  }
};
