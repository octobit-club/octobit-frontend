"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setIsExpired(false)
      } else {
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="bg-transparent backdrop-blur-sm border border-red-500/20 rounded-2xl">
        <div className="p-8 text-center">
          <h3 className="text-3xl font-bold text-red-500 mb-3 drop-shadow-lg">Event Started!</h3>
          <p className="text-red-400 text-lg drop-shadow-md">The event has already begun. Check back for updates!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-3xl font-bold text-foreground mb-8 drop-shadow-lg">Event Countdown</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
        <div className="text-center hover:scale-105 transition-all duration-300">
          <div className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">{timeLeft.days}</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2 drop-shadow">Days</div>
        </div>
        <div className="text-center hover:scale-105 transition-all duration-300">
          <div className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">{timeLeft.hours}</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2 drop-shadow">Hours</div>
        </div>
        <div className="text-center hover:scale-105 transition-all duration-300">
          <div className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">{timeLeft.minutes}</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2 drop-shadow">Minutes</div>
        </div>
        <div className="text-center hover:scale-105 transition-all duration-300">
          <div className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">{timeLeft.seconds}</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2 drop-shadow">Seconds</div>
        </div>
      </div>
    </div>
  )
}