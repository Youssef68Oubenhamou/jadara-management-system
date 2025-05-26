// Student/event.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Event = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Student Hackathon</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Date: June 15, 2025</p>
        <p>Location: University Auditorium</p>
        <p>Join us for an exciting 24-hour coding event!</p>
      </CardContent>
    </Card>
  );
};

export default Event;
