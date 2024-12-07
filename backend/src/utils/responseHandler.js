const sendResponse = (res, status, data) => {
  res.status(status).json({ success: true, data });
};

const sendError = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

module.exports = { sendResponse, sendError };