function calculateDateandTime() {
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  return { dateString, timeString };
}

function CheckoutDetails() {
  return (
    <div className="text-sm text-emerald-800">
      <p>Date: {calculateDateandTime().dateString}</p>
      <p>Time: {calculateDateandTime().timeString}</p>
    </div>
  );
}

export default CheckoutDetails;
