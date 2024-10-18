import { db } from "../conf";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Ensure you have Firebase Storage imported
import { storage } from "../conf"; // Import your Firebase storage configuration
import { v4 as uuidv4 } from "uuid";
class StallManagement {
  constructor(user) {
    this.user = user; // Store user to identify whose stall is being managed
    this.userCollection = collection(db, "users", user.uid, "stalls"); // User-specific stall collection
  }

  // 1. Upload an Image to Firebase Storage
  async uploadImage(file) {
    const storageRef = ref(storage, `stalls/${this.user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  // 2. Add a New Stall for the User
  async addStall({
    stallName,
    stallNumber,
    city,
    eventName,
    productCategory,
    image,
  }) {
    try {
      const stallRef = await addDoc(this.userCollection, {
        stallName,
        stallNumber,
        city,
        eventName,
        productCategory,
        image, // Store the image URL
        createdAt: new Date().toISOString(),
      });
      console.log(`Stall "${stallName}" added successfully.`);
      return stallRef.id;
    } catch (error) {
      console.error("Error adding stall", error);
      throw error;
    }
  }

  // 3. Update a Stall
  async updateStall(stallId, updates) {
    try {
      const stallDoc = doc(this.userCollection, stallId);
      await updateDoc(stallDoc, updates);
      console.log(`Stall "${stallId}" updated successfully.`);
    } catch (error) {
      console.error("Error updating stall", error);
      throw error;
    }
  }

  async deleteStall(stallId) {
    try {
      // Get references to subcollections (replace 'subcollectionName' with actual names)
      const subcollectionNames = ['expenses', 'pos', 'products'];
      
      // Loop through each subcollection and delete its documents
      for (const subcollectionName of subcollectionNames) {
        const subcollectionRef = collection(this.userCollection, stallId, subcollectionName);
        const subcollectionDocs = await getDocs(subcollectionRef);
        
        // Delete each document in the subcollection
        for (const doc of subcollectionDocs.docs) {
          await deleteDoc(doc.ref);
          console.log(`Document "${doc.id}" deleted from subcollection "${subcollectionName}".`);
        }
      }
      
      // Now delete the main stall document
      const stallDoc = doc(this.userCollection, stallId);
      await deleteDoc(stallDoc);
      console.log(`Stall "${stallId}" deleted successfully.`);
      
    } catch (error) {
      console.error("Error deleting stall", error);
      throw error;
    }
  }
  // 5. Add Expense to a Stall
  async addExpense(stallId, { date, category, description, amount }) {
    try {
      const expenseRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "expenses"
      );
      await addDoc(expenseRef, { date, category, description, amount });
      console.log("Expense added successfully.");
    } catch (error) {
      console.error("Error adding expense", error);
      throw error;
    }
  }

  // 6. Update an Expense
  async updateExpense(stallId, expenseId, updates) {
    try {
      const expenseDoc = doc(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "expenses",
        expenseId
      );
      await updateDoc(expenseDoc, updates);
      console.log("Expense updated successfully.");
    } catch (error) {
      console.error("Error updating expense", error);
      throw error;
    }
  }

  // 7. Delete an Expense
  async deleteExpense(stallId, expenseId) {
    try {
      const expenseDoc = doc(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "expenses",
        expenseId
      );
      await deleteDoc(expenseDoc);
      console.log("Expense deleted successfully.");
    } catch (error) {
      console.error("Error deleting expense", error);
      throw error;
    }
  }

  // 8. Add Product to a Stall
  async addProduct(stallId, { name, price, quantity }) {
    try {
      const productRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "products"
      );
      await addDoc(productRef, { name, price ,quantity });
      console.log(`Product "${name}" added successfully.`);
    } catch (error) {
      console.error("Error adding product", error);
      throw error;
    }
  }

  // 9. Update a Product
  async updateProduct(stallId, productId, updates) {
    try {
      const productDoc = doc(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "products",
        productId
      );
      await updateDoc(productDoc, updates);
      console.log("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product", error);
      throw error;
    }
  }

  // 10. Delete a Product
  async deleteProduct(stallId, productId) {
    try {
      const productDoc = doc(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "products",
        productId
      );
      await deleteDoc(productDoc);
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product", error);
      throw error;
    }
  }

  // 11. Add a POS Entry for a Customer Purchase
  async addPOS(stallId, { customerName, products, totalAmount }) {
    try {
      const posRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "pos"
      );

      // Generate a unique transaction ID using UUID
      const transactionId = uuidv4();

      const posData = products.map((product) => ({
        ...product,
      }));

      await addDoc(posRef, {
        customerName,
        products: posData,
        totalAmount, // Use the totalAmount passed from the frontend
        transactionId, // Include the UUID transaction ID
        date: new Date().toISOString(),
      });

      console.log(
        `POS entry for "${customerName}" added successfully with transaction ID: ${transactionId}.`
      );
    } catch (error) {
      console.error("Error adding POS entry", error);
      throw error;
    }
  }

  // 12. Update a POS Entry
  async updatePOS(stallId, posId, updates) {
    try {
      const posDoc = doc(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "pos",
        posId
      );
      await updateDoc(posDoc, updates);
      console.log("POS entry updated successfully.");
    } catch (error) {
      console.error("Error updating POS entry", error);
      throw error;
    }
  }

  // 13. Delete a POS Entry
  async deletePOS(stallId, posId) {
    try {
      const posDoc = doc(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "pos",
        posId
      );
      await deleteDoc(posDoc);
      console.log("POS entry deleted successfully.");
    } catch (error) {
      console.error("Error deleting POS entry", error);
      throw error;
    }
  }

  // 14. Get All Stalls for the User
  async getStalls() {
    try {
      const snapshot = await getDocs(this.userCollection);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching stalls", error);
      throw error;
    }
  }

  // 15. Get All Products for a Stall
  async getProducts(stallId) {
    try {
      const productRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "products"
      );
      const snapshot = await getDocs(productRef);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching products", error);
      throw error;
    }
  }

  // 16. Get All Expenses for a Stall
  async getExpenses(stallId) {
    try {
      const expenseRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "expenses"
      );
      const snapshot = await getDocs(expenseRef);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching expenses", error);
      throw error;
    }
  }

  // 17. Get POS Data for a Stall
  async getPOS(stallId) {
    try {
      const posRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "pos"
      );
      const snapshot = await getDocs(posRef);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching POS data", error);
      throw error;
    }
  }
  // 1. Calculate Total Expenses for a Stall
  async calculateTotalExpenses(stallId) {
    try {
      const expenseRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "expenses"
      );
      const snapshot = await getDocs(expenseRef);
      const totalExpenses = snapshot.docs.reduce(
        (sum, doc) => sum + doc.data().amount,
        0
      );
      return totalExpenses;
    } catch (error) {
      console.error("Error calculating total expenses", error);
      throw error;
    }
  }

  // 2. Calculate Total Sales for a Stall
  async calculateTotalSales(stallId) {
    try {
      const posRef = collection(
        db,
        "users",
        this.user.uid,
        "stalls",
        stallId,
        "pos"
      );
      const snapshot = await getDocs(posRef);
      const totalSales = snapshot.docs.reduce(
        (sum, doc) => sum + doc.data().totalAmount,
        0
      );
      return totalSales;
    } catch (error) {
      console.error("Error calculating total sales", error);
      throw error;
    }
  }
  async contactUs({ name, email, subject, message }) {
    try {
      const feedbackRef = collection(db, "users", this.user.uid, "feedback");

      await addDoc(feedbackRef, {
        name,
        email,
        subject,
        message,
        submittedAt: new Date().toISOString(),
      });

      console.log(`Feedback from "${name}" added successfully.`);
    } catch (error) {
      console.error("Error adding feedback", error);
      throw error;
    }
  }
  // 3. Fetch All Stall Data with Aggregated Sales and Expenses
  async getStallsWithStats() {
    try {
      const stallSnapshot = await getDocs(this.userCollection);
      const stalls = stallSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const stallsWithStats = await Promise.all(
        stalls.map(async (stall) => {
          const totalExpenses = await this.calculateTotalExpenses(stall.id);
          const totalSales = await this.calculateTotalSales(stall.id);
          return {
            ...stall,
            totalExpenses,
            totalSales,
            revenue: (-1)*(totalSales - totalExpenses),
          };
        })
      );

      return stallsWithStats;
    } catch (error) {
      console.error("Error fet  ching stalls with stats", error);
      throw error;
    }
  }
}

export default StallManagement;
