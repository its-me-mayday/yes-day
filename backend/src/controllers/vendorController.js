const { getVendors, addVendor } = require('../models/vendorModel');

// Get all vendors
const getVendorsController = async (req, res) => {
  try {
    const vendors = await getVendors();
    res.json(vendors);
  } catch (err) {
    res.status(500).send('Error retrieving vendors');
  }
};

// Create a new vendor
const createVendorController = async (req, res) => {
  const { name, price, paid, contract_image } = req.body;

  try {
    const vendor = await addVendor(name, price, paid, contract_image);
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).send('Error creating vendor');
  }
};

module.exports = { getVendorsController, createVendorController };