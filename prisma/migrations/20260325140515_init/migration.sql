-- CreateTable
CREATE TABLE "Salon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "tagline" TEXT,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "maxQueueSize" INTEGER NOT NULL DEFAULT 10,
    "slotDuration" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barber" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'barber',
    "status" TEXT NOT NULL DEFAULT 'available',
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "barberId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isDayOff" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "barberId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueEntry" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "barberId" TEXT,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "position" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "servedAt" TIMESTAMP(3),

    CONSTRAINT "QueueEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueEntry" ADD CONSTRAINT "QueueEntry_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueEntry" ADD CONSTRAINT "QueueEntry_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
