-- Create the 'vendors' table to store vendor details like name, price, payment status, and contract image
CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,               -- Unique ID for each vendor
  name VARCHAR(255) NOT NULL,          -- Vendor's name (non-nullable)
  price DECIMAL(10, 2) NOT NULL,       -- Price of the vendor (non-nullable)
  paid BOOLEAN DEFAULT FALSE,          -- Payment status (default is FALSE)
  contract_image VARCHAR(255),         -- Path to the contract image (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Automatically set the last update timestamp
);

-- Create the 'appointments' table to store appointments with vendors
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,               -- Unique ID for each appointment
  vendor_id INT REFERENCES vendors(id) ON DELETE CASCADE,  -- Reference to the vendor (on delete cascade)
  appointment_date DATE NOT NULL,      -- Date of the appointment (non-nullable)
  description TEXT,                    -- Description of the appointment (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Automatically set the last update timestamp
);

-- Create the 'payments' table to store payment details
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,               -- Unique ID for each payment
  vendor_id INT REFERENCES vendors(id) ON DELETE CASCADE,  -- Reference to the vendor (on delete cascade)
  amount DECIMAL(10, 2) NOT NULL,       -- Payment amount (non-nullable)
  payment_date DATE NOT NULL,          -- Payment date (non-nullable)
  method VARCHAR(50),                  -- Payment method (e.g., cash, credit card)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Automatically set creation timestamp
);

-- Function to automatically update 'updated_at' column when a record is modified
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;  -- Set the 'updated_at' column to the current time
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update 'updated_at' in the 'vendors' table
CREATE TRIGGER vendors_update_timestamp
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- Trigger to update 'updated_at' in the 'appointments' table
CREATE TRIGGER appointments_update_timestamp
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- Trigger to update 'updated_at' in the 'payments' table
CREATE TRIGGER payments_update_timestamp
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- Insert some example data into the 'vendors' table to test
INSERT INTO vendors (name, price, paid, contract_image) 
VALUES
  ('Catering Eventi Srl', 2000.00, FALSE, 'path/to/contract1.jpg'),
  ('Fotografo Matrimoni', 1500.00, TRUE, 'path/to/contract2.jpg'),
  ('Fiori & Decorazioni', 800.00, FALSE, 'path/to/contract3.jpg');

-- Insert some example appointments for vendors
INSERT INTO appointments (vendor_id, appointment_date, description)
VALUES
  (1, '2024-05-20', 'Meeting to finalize catering details'),
  (2, '2024-06-01', 'Wedding photography trial shoot'),
  (3, '2024-04-10', 'Confirm flower and decoration order');

-- Insert some example payments made to vendors
INSERT INTO payments (vendor_id, amount, payment_date, method)
VALUES
  (1, 500.00, '2024-05-01', 'Bank Transfer'),
  (2, 1500.00, '2024-06-05', 'Credit Card');