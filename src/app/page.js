"use client";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="home-landing">
      <h1>Welcome to HackOn 25 Auth Demo</h1>
      <div className="home-btns">
        <Link href="/login" className="home-link-btn">Login</Link>
        <Link href="/register" className="home-link-btn">Register</Link>
      </div>
    </div>
  );
}
