// Card component based on shadcn/ui
import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={
        "rounded-2xl border bg-white text-card-foreground shadow-lg " +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={"flex flex-col space-y-1.5 p-6 " + className} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h3
      className={
        "text-2xl font-semibold leading-none tracking-tight " + className
      }
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={"p-6 pt-0 " + className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }) {
  return (
    <div className={"flex items-center p-6 pt-0 " + className} {...props}>
      {children}
    </div>
  );
}
