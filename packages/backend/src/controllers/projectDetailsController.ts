import { RequestHandler } from "express";
import * as ProjectDetailsService from "../services/projectDetailsServices";

// ----- CREATE -----
export const addContactPerson: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedContact = await ProjectDetailsService.addContactPersonService(projectId, req.body);

    res.status(201).json({ message: "Contacto agregado correctamente.", document: savedContact });

  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    console.error("Error al agregar el contacto:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addSolarPanel: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedSolarPanel = await ProjectDetailsService.addSolarPanelService(projectId, req.body);

    res.status(201).json({ message: "Panel solar agregado correctamente.", document: savedSolarPanel });

  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    console.error("Error al agregar el panel solar:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addInverter: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedInverter = await ProjectDetailsService.addInverterService(projectId, req.body);

    res.status(201).json({ message: "Inversor agregado correctamente.", document: savedInverter });

  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    console.error("Error al agregar el inversor:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addBattery: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedBattery = await ProjectDetailsService.addBatteryService(projectId, req.body);

    res.status(201).json({ message: "Bateria agregada correctamente.", document: savedBattery });

  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    console.error("Error al agregar la bateria:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// ----- READ -----
export const getAllProjectDetails: RequestHandler = async (req, res) => {
  try {

    const projects = await ProjectDetailsService.getAllProjectDetailsService();

    res.status(200).json(projects);
    return;
  } catch (error) {
    console.error("Error al obtener todos los proyectos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getAllContactPersons: RequestHandler = async (req, res) => {
  try {

    const contacts = await ProjectDetailsService.getAllContactPersonsService();

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error al obtener todos los contactos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllSolarPanels: RequestHandler = async (req, res) => {
  try {

    const solarPanels = await ProjectDetailsService.getAllSolarPanelsService();

    res.status(200).json(solarPanels);
  } catch (error) {
    console.error("Error al obtener todos los paneles solares:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllInverters: RequestHandler = async (req, res) => {
  try {

    const inverters = await ProjectDetailsService.getAllInvertersService();

    res.status(200).json(inverters);
  } catch (error) {
    console.error("Error al obtener todos los inversores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllBatteries: RequestHandler = async (req, res) => {
  try {

    const batteries = await ProjectDetailsService.getAllBatteriesService();

    res.status(200).json(batteries);
  } catch (error) {
    console.error("Error al obtener todas las baterías:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProjectDetails: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const project = await ProjectDetailsService.getProjectDetailsService(projectId);

    res.status(200).json(project);
    return;
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "proyecto no encontrado." });
      return;
    }
    console.error("Error al encontrar el proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getContactPerson: RequestHandler = async (req, res) => {
  try {
    const { projectId, contactId } = req.params as { projectId: string, contactId: string };

    const contact = await ProjectDetailsService.getContactPersonService(projectId, contactId);

    res.status(200).json(contact);
    return;
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "CONTACT_NOT_FOUND") {
      res.status(404).json({ message: "Contacto no encontrado." });
      return;
    }
    console.error("Error al encontrar el contacto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getSolarPanel: RequestHandler = async (req, res) => {
  try {
    const { projectId, solarPanelId } = req.params as { projectId: string, solarPanelId: string };

    const solarPanel = await ProjectDetailsService.getSolarPanelService(projectId, solarPanelId);

    res.status(200).json(solarPanel);
    return;
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "SOLAR_PANEL_NOT_FOUND") {
      res.status(404).json({ message: "Panel solar no encontrado." });
      return;
    }
    console.error("Error al encontrar el panel solar:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getInverter: RequestHandler = async (req, res) => {
  try {
    const { projectId, inverterId } = req.params as { projectId: string, inverterId: string };

    const inverter = await ProjectDetailsService.getInverterService(projectId, inverterId);

    res.status(200).json(inverter);
    return;
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "INVERTER_NOT_FOUND") {
      res.status(404).json({ message: "Inversor no encontrado." });
      return;
    }
    console.error("Error al encontrar el inversor:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getBattery: RequestHandler = async (req, res) => {
  try {
    const { projectId, batteryId } = req.params as { projectId: string, batteryId: string };

    const battery = await ProjectDetailsService.getBatteryService(projectId, batteryId);

    res.status(200).json(battery);
    return;
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "BATTERY_NOT_FOUND") {
      res.status(404).json({ message: "Bateria no encontrada." });
      return;
    }
    console.error("Error al encontrar la bateria:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateProjectDetails: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const projectUpdate = await ProjectDetailsService.updateProjectDetailsService(projectId, req.body);

    res.status(200).json({ message: "Proyecto actualizado correctamente.", document: projectUpdate });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateContactPerson: RequestHandler = async (req, res) => {
  try {
    const { projectId, contactId } = req.params as { projectId: string, contactId: string };

    const contactUpdate = await ProjectDetailsService.updateContactPersonService(projectId, contactId, req.body);

    res.status(200).json({ message: "Contacto actualizado correctamente.", document: contactUpdate });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "CONTACT_NOT_FOUND") {
      res.status(404).json({ message: "Contacto no encontrado." });
      return;
    } else {
      console.error("Error al actualizar el contacto:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

export const updateSolarPanel: RequestHandler = async (req, res) => {
  try {
    const { projectId, solarPanelId } = req.params as { projectId: string, solarPanelId: string };

    const solarPanelUpdate = await ProjectDetailsService.updateSolarPanelService(projectId, solarPanelId, req.body);

    res.status(200).json({ message: "Panel solar actualizado correctamente.", document: solarPanelUpdate });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "SOLAR_PANEL_NOT_FOUND") {
      res.status(404).json({ message: "Panel solar no encontrado." });
      return;
    } else {
      console.error("Error al actualizar el panel solar:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

export const updateInverter: RequestHandler = async (req, res) => {
  try {
    const { projectId, inverterId } = req.params as { projectId: string, inverterId: string };

    const inverterUpdate = await ProjectDetailsService.updateInverterService(projectId, inverterId, req.body);

    res.status(200).json({ message: "Inversor actualizado correctamente.", document: inverterUpdate });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "INVERTER_NOT_FOUND") {
      res.status(404).json({ message: "Inversor no encontrado." });
      return;
    } else {
      console.error("Error al actualizar inversor:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

export const updateBattery: RequestHandler = async (req, res) => {
  try {
    const { projectId, batteryId } = req.params as { projectId: string, batteryId: string };

    const batteryUpdate = await ProjectDetailsService.updateBatteryService(projectId, batteryId, req.body);

    res.status(200).json({ message: "Bateria actualizada correctamente.", document: batteryUpdate });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "BATTERY_NOT_FOUND") {
      res.status(404).json({ message: "Bateria no encontrada." });
      return;
    } else {
      console.error("Error al actualizar bateria:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

// ----- DELETE -----
export const deleteProjectDetails: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const projectDelete = await ProjectDetailsService.deleteProjectDetailsService(projectId);

    res.status(200).json({ message: "Detalles del proyecto eliminada correctamente.", document: projectDelete });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    console.error("Error al eliminar detalles del proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteContactPerson: RequestHandler = async (req, res) => {
  try {
    const { projectId, contactId } = req.params as { projectId: string, contactId: string };

    const contactDelete = await ProjectDetailsService.deleteContactPersonService(projectId, contactId);

    res.status(200).json({ message: "Contacto eliminado correctamente.", document: contactDelete });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "CONTACT_NOT_FOUND") {
      res.status(404).json({ message: "Contacto no encontrado." });
      return;
    }
    console.error("Error al eliminar contacto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteSolarPanel: RequestHandler = async (req, res) => {
  try {
    const { projectId, solarPanelId } = req.params as { projectId: string, solarPanelId: string };

    const solarPanelDelete = await ProjectDetailsService.deleteSolarPanelService(projectId, solarPanelId);

    res.status(200).json({ message: "Panel solar eliminado correctamente.", document: solarPanelDelete });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "CONTACT_NOT_FOUND") {
      res.status(404).json({ message: "Panel solar no encontrado." });
      return;
    }
    console.error("Error al eliminar panel solar:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteInverter: RequestHandler = async (req, res) => {
  try {
    const { projectId, inverterId } = req.params as { projectId: string, inverterId: string };

    const inverterDelete = await ProjectDetailsService.deleteInverterService(projectId, inverterId);

    res.status(200).json({ message: "Inversor eliminado correctamente.", document: inverterDelete });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "INVERTER_NOT_FOUND") {
      res.status(404).json({ message: "Inversor no encontrado." });
      return;
    }
    console.error("Error al eliminar inversor:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteBattery: RequestHandler = async (req, res) => {
  try {
    const { projectId, batteryId } = req.params as { projectId: string, batteryId: string };

    const batteryDelete = await ProjectDetailsService.deleteBatteryService(projectId, batteryId);

    res.status(200).json({ message: "Bateria eliminada correctamente.", document: batteryDelete });
  } catch (error: any) {
    if (error.message === "PROJECT_DETAILS_NOT_FOUND") {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }
    if (error.message === "BATTERY_NOT_FOUND") {
      res.status(404).json({ message: "Bateria no encontrada." });
      return;
    }
    console.error("Error al eliminar bateria:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};