export default async function handler(req, res) {

  res.status(200).json({
    success: true,
    message: "NISM AI Engine Backend Working",
    notes: "Backend connected successfully."
  });

}
