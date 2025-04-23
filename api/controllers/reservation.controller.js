import prisma from "../lib/prisma.js";


export const checkSlotAvailability = async (req, res) => {
  const { propertyId, reservedDate, userId } = req.body;

  try {
    // Step 1: Check for existing reservation
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        propertyId,
        reservedDate: new Date(reservedDate),
      },
    });

    if (existingReservation) {
      return res.status(200).json({ available: false, message: "Slot already reserved." });
    }

    // Step 2: Create the reservation
    const newReservation = await prisma.reservation.create({
      data: {
        propertyId,
        userId,
        reservedDate: new Date(reservedDate),
      },
    });

    return res.status(201).json({
      available: true,
      message: "Slot reserved successfully.",
      reservation: newReservation,
    });
    

  } catch (error) {
    console.error("Error checking/reserving slot:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};



