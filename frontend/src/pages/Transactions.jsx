import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import TransactionItem from "../components/TransactionItem";
import axios from "axios";
import { BASE_URL } from "../config";

export const Transactions = () => {
  // 1️⃣ States
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2️⃣ Token + userId
  const token = localStorage.getItem("token");
  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).userId
    : null;

  // 3️⃣ Fetch transactions (DIRECT AXIOS)
  const fetchTransactions = async (pageNumber) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${BASE_URL}/api/v1/account/history?page=${pageNumber}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 4️⃣ Merge old + new transactions
      setTransactions((prev) => [
        ...prev,
        ...res.data.transactions,
      ]);

      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Transaction fetch error:", err);
      setError(
        err.response?.data?.message ||
        "Failed to load transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  // 5️⃣ Call API on page change
  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  return (
    <div>
      <Appbar />

      <div className="m-8">
        <h2 className="text-2xl font-bold mb-4">
          Transaction History
        </h2>

        {/* Error */}
        {error && (
          <div className="text-red-500 mb-2">
            {error}
          </div>
        )}

        {/* Empty state */}
        {transactions.length === 0 && !loading && !error && (
          <div className="text-gray-500">
            No transactions yet
          </div>
        )}

        {/* Transactions list */}
        <div className="space-y-3">
          {transactions.map((txn) => (
            <TransactionItem
              key={txn._id}
              txn={txn}
              userId={userId}
            />
          ))}
        </div>

        {/* Load more */}
        {page < totalPages && (
          <button
            disabled={loading}
            onClick={() => setPage((p) => p + 1)}
            className="mt-6 px-4 py-2 bg-gray-800 text-white rounded"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};
