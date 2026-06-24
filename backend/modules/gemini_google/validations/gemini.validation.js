const validateChatInput = (req, res, next) => {
    const { currentMessage, chatHistory } = req.body;
    const hasHistory = chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0;

    // Si ya existe una conversación activa, se vuelve obligatorio el mensaje del usuario
    if (hasHistory && (!currentMessage || typeof currentMessage !== 'string' || !currentMessage.trim())) {
        return res.status(400).json({
            success: false,
            message: 'El mensaje actual es requerido para continuar la conversación.'
        });
    }

    if (chatHistory && !Array.isArray(chatHistory)) {
        return res.status(400).json({
            success: false,
            message: 'El historial de chat debe tener un formato de lista/array válido.'
        });
    }

    next();
};

const validateMigrationInput = (req, res, next) => {
    const { excelData } = req.body;

    if (!excelData) {
        return res.status(400).json({
            success: false,
            message: 'Los datos del archivo Excel (excelData) son estrictamente requeridos.'
        });
    }

    if (typeof excelData !== 'object') {
        return res.status(400).json({
            success: false,
            message: 'El campo excelData debe ser un objeto o lista con la estructura del documento original.'
        });
    }

    next();
};

module.exports = {
    validateChatInput,
    validateMigrationInput
};