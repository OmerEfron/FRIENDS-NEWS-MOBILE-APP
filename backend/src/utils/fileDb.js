const fs = require('fs').promises;
const path = require('path');
const { setupLogger } = require('./logger');

const logger = setupLogger();

class FileDb {
  static dataDir = path.join(__dirname, '../data');

  static async initialize() {
    try {
      await fs.mkdir(FileDb.dataDir, { recursive: true });
      
      // Initialize files if they don't exist
      const files = ['groups.json', 'posts.json', 'media.json'];
      for (const file of files) {
        const filePath = path.join(FileDb.dataDir, file);
        try {
          await fs.access(filePath);
        } catch (error) {
          // File doesn't exist, create it with empty data
          const initialData = { [file.split('.')[0]]: [] };
          await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
          logger.info(`Initialized ${file} with empty data`);
        }
      }
    } catch (error) {
      logger.error('Error initializing FileDb:', error);
      throw error;
    }
  }

  static async readData(filename) {
    try {
      const filePath = path.join(FileDb.dataDir, filename);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        logger.warn(`File ${filename} not found, returning empty data`);
        return { [filename.split('.')[0]]: [] };
      }
      logger.error(`Error reading ${filename}:`, error);
      throw error;
    }
  }

  static async writeData(filename, data) {
    try {
      const filePath = path.join(FileDb.dataDir, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      logger.error(`Error writing ${filename}:`, error);
      throw error;
    }
  }

  static generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static async findById(filename, id) {
    const data = await this.readData(filename);
    const collection = data[filename.split('.')[0]];
    return collection.find(item => item.id === id);
  }

  static async findAll(filename) {
    const data = await this.readData(filename);
    return data[filename.split('.')[0]];
  }

  static async create(filename, item) {
    const data = await this.readData(filename);
    const collection = filename.split('.')[0];
    
    const newItem = {
      id: this.generateId(collection),
      createdAt: new Date().toISOString(),
      ...item
    };
    
    data[collection].push(newItem);
    await this.writeData(filename, data);
    return newItem;
  }

  static async update(filename, id, updates) {
    const data = await this.readData(filename);
    const collection = filename.split('.')[0];
    const index = data[collection].findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in ${filename}`);
    }
    
    data[collection][index] = {
      ...data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await this.writeData(filename, data);
    return data[collection][index];
  }

  static async delete(filename, id) {
    const data = await this.readData(filename);
    const collection = filename.split('.')[0];
    const index = data[collection].findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in ${filename}`);
    }
    
    data[collection].splice(index, 1);
    await this.writeData(filename, data);
  }
}

module.exports = FileDb; 