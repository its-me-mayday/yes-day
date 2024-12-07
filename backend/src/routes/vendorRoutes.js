const express = require('express');
const router = express.Router();
const { getVendors, addVendor } = require('../models/vendorModel');

/**
 * @swagger
 * /api/v1/vendors:
 *   get:
 *     summary: Get all vendors
 *     responses:
 *       200:
 *         description: A list of vendors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   paid:
 *                     type: boolean
 *                   contract_image:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const vendors = await getVendors();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/vendors:
 *   post:
 *     summary: Create a new vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               paid:
 *                 type: boolean
 *               contract_image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendor created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 paid:
 *                   type: boolean
 *                 contract_image:
 *                   type: string
 */
router.post('/', async (req, res) => {
  const { name, price, paid } = req.body;
  try {
    const newVendor = await addVendor(name, price, paid);
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;