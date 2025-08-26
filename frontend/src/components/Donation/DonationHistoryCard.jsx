import { Card } from "@/components/ui/card";

function DonationHistoryCard({ donation }) {
  return (
    <Card className="p-4 mb-4 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Top row: donor + amount */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-stone-700">
          {donation.donorName || "Anonymous"}
        </span>
        <span className="text-green-600 font-bold">
          {donation.amount} {donation.token}
        </span>
      </div>

      {/* Transaction hash (shortened & linked) */}
      <p className="text-sm text-gray-500">
        Tx:{" "}
        <a
          href={`https://etherscan.io/tx/${donation.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {donation.txHash.slice(0, 8)}...{donation.txHash.slice(-6)}
        </a>
      </p>

      {/* Wallet address */}
      <p className="text-sm text-gray-500">
        From: {donation.wallet.slice(0, 6)}...{donation.wallet.slice(-4)}
      </p>

      {/* Date */}
      <p className="text-sm text-gray-500">
        Date: {new Date(donation.timestamp).toLocaleString()}
      </p>
    </Card>
  );
}

export default DonationHistoryCard;
