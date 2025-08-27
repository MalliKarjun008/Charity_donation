// Mock implementation without Helia dependencies

class IPFSService {
  constructor() {
    this.storage = new Map(); // In-memory storage for mock implementation
    console.log('Mock IPFS service initialized');
  }
  
  // Upload string data to IPFS
  async uploadString(data) {
    try {
      // Generate a mock CID (Content Identifier)
      const mockCid = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Store in our mock storage
      this.storage.set(mockCid, data);
      
      console.log(`Mock IPFS: Uploaded string with CID ${mockCid}`);
      return mockCid;
    } catch (error) {
      console.error('Error in mock IPFS upload:', error);
      throw error;
    }
  }
  
  // Get string data from IPFS
  async getString(cid) {
    try {
      // Retrieve from our mock storage
      if (!this.storage.has(cid)) {
        throw new Error(`CID ${cid} not found in mock IPFS storage`);
      }
      
      const data = this.storage.get(cid);
      console.log(`Mock IPFS: Retrieved string with CID ${cid}`);
      return data;
    } catch (error) {
      console.error('Error in mock IPFS retrieval:', error);
      throw error;
    }
  }
  
  // Upload JSON data to IPFS
  async uploadJSON(data) {
    const jsonString = JSON.stringify(data);
    const cid = await this.uploadString(jsonString);
    console.log(`Mock IPFS: Uploaded JSON data with CID ${cid}`);
    return cid;
  }
  
  // Get JSON data from IPFS
  async getJSON(cid) {
    const jsonString = await this.getString(cid);
    console.log(`Mock IPFS: Retrieved and parsed JSON data with CID ${cid}`);
    return JSON.parse(jsonString);
  }
}

module.exports = new IPFSService();