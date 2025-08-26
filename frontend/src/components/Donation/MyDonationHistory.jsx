import DonationHistoryCard from "@/components/Donation/DonationHistoryCard";

const dummyDonations = [
  {
    donorName: "Alice",
    amount: 0.05,
    token: "ETH",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    wallet: "0xA12B34C56D78E90F12AB34CD56E78F90AB12CDEF",
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
  },
  {
    donorName: "Bob",
    amount: 500,
    token: "INR",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    wallet: "0xF98E76D54C32B10A98E76D54C32B10A98E76D54C",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    donorName: null, // anonymous
    amount: 0.1,
    token: "MATIC",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcd",
    wallet: "0xABCD9876543210EFABCD9876543210EFABCD9876",
    timestamp: Date.now() - 1000 * 60 * 10, // 10 mins ago
  },
];

function MyDonationHistory() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-stone-700">
        Donation History
      </h2>
      {dummyDonations.map((donation, index) => (
        <DonationHistoryCard key={index} donation={donation} />
      ))}
    </div>
  );
}

export default MyDonationHistory;
