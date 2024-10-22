import React, { useEffect, useState } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import { TestimonialCard } from "./TestimonialCard";
import "./TestimonialList.css"

export const TestimonialList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
        const querySnapshot = await getDocs(collection(db, "testimonies"));
        const fetchedTestimonials = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data()

            if (data.time && data.time.toDate) {
                data.time = data.time.toDate(); // Converts Firestore Timestamp to Date
            }

            fetchedTestimonials.push({ id: doc.id, ...data });
            console.log(fetchedTestimonials[0])
        });
        setTestimonials(fetchedTestimonials);
        setLoading(false)
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or return null if you don't want any content
    }

    return (
        <div style={{ padding: "10vh", margin: "0 auto" }}>
            <h1 style = {{margin: "10vh" }} className="list-container">See what others have to say about me...</h1>

            <div className="testimonial-grid">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};