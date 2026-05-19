const prisma = require("../../../prisma/client");

exports.getUnits = async (req, res) => {
  try {
    const units = await prisma.unit.findMany({
      where: {
        companyId: req.user.companyId,
        isActive: true
      },
      orderBy: {
        name: "asc"
      }
    });

    res.json({
      success: true,
      data: units
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al obtener unidades"
    });
  }
};

exports.getUnitById = async (req, res) => {
  try {

    const unit = await prisma.unit.findFirst({
      where: {
        id: parseInt(req.params.id),
        companyId: req.user.companyId
      }
    });

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unidad no encontrada"
      });
    }

    res.json({
      success: true,
      data: unit
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al obtener unidad"
    });
  }
};

exports.createUnit = async (req, res) => {
  try {

    const {
      name,
      abbreviation,
      type,
      conversionFactor,
      baseUnit
    } = req.body;

    // Validar duplicados
    const exists = await prisma.unit.findFirst({
      where: {
        OR: [
          { name },
          { abbreviation }
        ],
        companyId: req.user.companyId
      }
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "La unidad ya existe"
      });
    }

    const unit = await prisma.unit.create({
      data: {
        name,
        abbreviation,
        type,
        conversionFactor,
        baseUnit,
        companyId: req.user.companyId
      }
    });

    res.status(201).json({
      success: true,
      message: "Unidad creada correctamente",
      data: unit
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al crear unidad"
    });

  }
};

exports.updateUnit = async (req, res) => {
  try {

    const unitId = parseInt(req.params.id);

    const exists = await prisma.unit.findFirst({
      where: {
        id: unitId,
        companyId: req.user.companyId
      }
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Unidad no encontrada"
      });
    }

    const unit = await prisma.unit.update({
      where: {
        id: unitId
      },
      data: req.body
    });

    res.json({
      success: true,
      message: "Unidad actualizada correctamente",
      data: unit
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al actualizar unidad"
    });

  }
};

exports.deleteUnit = async (req, res) => {
  try {

    const unitId = parseInt(req.params.id);

    const exists = await prisma.unit.findFirst({
      where: {
        id: unitId,
        companyId: req.user.companyId
      }
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Unidad no encontrada"
      });
    }

    // Soft delete
    await prisma.unit.update({
      where: {
        id: unitId
      },
      data: {
        isActive: false
      }
    });

    res.json({
      success: true,
      message: "Unidad eliminada correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al eliminar unidad"
    });

  }
};