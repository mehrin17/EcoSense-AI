import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AIRequest {
  climateRisk: {
    floodRisk: string;
    heatwaveRisk: string;
    droughtRisk: string;
    floodScore: number;
    heatwaveScore: number;
    droughtScore: number;
  };
  carbonFootprint: {
    annual: number;
    monthly: number;
    category: string;
    transportEmissions: number;
    electricityEmissions: number;
    lifestyleEmissions: number;
    sustainabilityScore: number;
  };
  carbonInputs: {
    vehicleType: string;
    dailyDistance: number;
    monthlyElectricity: number;
    dietType: string;
    wasteGeneration: string;
  };
  location: {
    country: string;
    state: string;
    city: string;
  };
}

interface AIRecommendation {
  category: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  impact: string;
}

// Gemini API integration placeholder
// When a Gemini API key is available, configure it as a secret:
//   - Name: GEMINI_API_KEY
//   - Then uncomment and use the real API call below
async function generateGeminiRecommendations(data: AIRequest): Promise<AIRecommendation[]> {
  /*
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const prompt = `As a sustainability advisor, analyze the following climate and carbon data for ${data.location.city}, ${data.location.state}, ${data.location.country}:

Climate Risks:
- Flood Risk: ${data.climateRisk.floodRisk} (${data.climateRisk.floodScore}%)
- Heatwave Risk: ${data.climateRisk.heatwaveRisk} (${data.climateRisk.heatwaveScore}%)
- Drought Risk: ${data.climateRisk.droughtRisk} (${data.climateRisk.droughtScore}%)

Carbon Footprint:
- Annual: ${data.carbonFootprint.annual} tons CO₂
- Category: ${data.carbonFootprint.category}
- Transport: ${data.carbonFootprint.transportEmissions} tons
- Electricity: ${data.carbonFootprint.electricityEmissions} tons
- Lifestyle: ${data.carbonFootprint.lifestyleEmissions} tons

Lifestyle:
- Vehicle: ${data.carbonInputs.vehicleType}, ${data.carbonInputs.dailyDistance}km/day
- Electricity: ${data.carbonInputs.monthlyElectricity} kWh/month
- Diet: ${data.carbonInputs.dietType}
- Waste: ${data.carbonInputs.wasteGeneration}

Generate 5-6 personalized sustainability recommendations as JSON array with fields: category (string), title (string), description (string), priority ("High" | "Medium" | "Low"), impact (string).`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (text) {
    return JSON.parse(text);
  }
  */

  // Fallback: return locally generated recommendations
  return generateLocalRecommendations(data);
}

function generateLocalRecommendations(data: AIRequest): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  const { climateRisk, carbonFootprint, carbonInputs, location } = data;

  // Climate risk based recommendations
  if (climateRisk.floodRisk === "High" || climateRisk.floodRisk === "Medium") {
    recommendations.push({
      category: "Climate Preparedness",
      title: "Flood Risk Mitigation",
      description: `${location.city} faces ${climateRisk.floodRisk.toLowerCase()} flood risk (${climateRisk.floodScore}%). Install flood barriers, elevate critical utilities, and consider flood insurance. Create an emergency evacuation plan for your household.`,
      priority: climateRisk.floodRisk === "High" ? "High" : "Medium",
      impact: "High protection for property and family safety",
    });
  }

  if (climateRisk.heatwaveRisk === "High" || climateRisk.heatwaveRisk === "Medium") {
    recommendations.push({
      category: "Climate Preparedness",
      title: "Heatwave Preparedness",
      description: `${location.city} has ${climateRisk.heatwaveRisk.toLowerCase()} heatwave risk (${climateRisk.heatwaveScore}%). Install reflective window films, plant shade trees, and ensure your home has adequate cooling. Keep emergency water supplies.`,
      priority: climateRisk.heatwaveRisk === "High" ? "High" : "Medium",
      impact: "Reduces heat-related health risks by 60%",
    });
  }

  if (climateRisk.droughtRisk === "High" || climateRisk.droughtRisk === "Medium") {
    recommendations.push({
      category: "Water Conservation",
      title: "Water Saving Strategy",
      description: `${location.city} faces ${climateRisk.droughtRisk.toLowerCase()} drought risk (${climateRisk.droughtScore}%). Install low-flow fixtures, collect rainwater, and use drought-resistant plants in your garden. Reduce lawn irrigation frequency.`,
      priority: climateRisk.droughtRisk === "High" ? "High" : "Medium",
      impact: "Can reduce water usage by 30-40%",
    });
  }

  // Carbon footprint based recommendations
  if (carbonInputs.vehicleType === "Petrol Car" || carbonInputs.vehicleType === "Diesel Car") {
    recommendations.push({
      category: "Transportation",
      title: "Switch to Low-Emission Transport",
      description: `Your ${carbonInputs.vehicleType} generates ${carbonFootprint.transportEmissions} tons CO₂/year. Consider an electric or hybrid vehicle, carpooling, or using public transit. Even switching 2 days/week to transit can save ${(carbonFootprint.transportEmissions * 0.4).toFixed(1)} tons annually.`,
      priority: "High",
      impact: `Save ~${(carbonFootprint.transportEmissions * 0.4).toFixed(1)} tons CO₂/year`,
    });
  }

  if (carbonInputs.vehicleType === "Electric Car" || carbonInputs.vehicleType === "Hybrid Car") {
    recommendations.push({
      category: "Transportation",
      title: "Optimize Your Green Vehicle",
      description: `Great choice with your ${carbonInputs.vehicleType}! Reduce daily distance by combining trips, use regenerative braking effectively, and charge during off-peak hours when grid is cleaner.`,
      priority: "Medium",
      impact: "Further reduce emissions by 10-15%",
    });
  }

  if (carbonInputs.monthlyElectricity > 400) {
    recommendations.push({
      category: "Energy",
      title: "Reduce Electricity Consumption",
      description: `Your ${carbonInputs.monthlyElectricity} kWh/month usage contributes ${carbonFootprint.electricityEmissions} tons CO₂/year. Switch to LED bulbs, use smart power strips, optimize thermostat settings, and consider solar panels if feasible.`,
      priority: "High",
      impact: "Can reduce electricity emissions by 25-35%",
    });
  } else {
    recommendations.push({
      category: "Energy",
      title: "Maintain Energy Efficiency",
      description: `Your ${carbonInputs.monthlyElectricity} kWh/month is reasonable. Keep it up with energy-efficient appliances, proper insulation, and turning off unused devices. Consider switching to a green energy provider.`,
      priority: "Medium",
      impact: "Maintain low electricity footprint",
    });
  }

  // Diet recommendations
  if (carbonInputs.dietType === "High Meat" || carbonInputs.dietType === "Average") {
    recommendations.push({
      category: "Lifestyle",
      title: "Adopt a Plant-Forward Diet",
      description: `Your ${carbonInputs.dietType} diet generates significant emissions. Try "Meatless Mondays" and gradually increase plant-based meals. Legumes, grains, and vegetables have much lower carbon footprints.`,
      priority: "Medium",
      impact: "Can reduce diet emissions by 20-40%",
    });
  } else if (carbonInputs.dietType === "Vegan" || carbonInputs.dietType === "Vegetarian") {
    recommendations.push({
      category: "Lifestyle",
      title: "Optimize Your Sustainable Diet",
      description: `Excellent choice with your ${carbonInputs.dietType} diet! Buy local and seasonal produce to minimize transport emissions, and compost food waste to reduce landfill methane.`,
      priority: "Medium",
      impact: "Further reduce emissions by 5-10%",
    });
  }

  // Waste recommendations
  if (carbonInputs.wasteGeneration === "High" || carbonInputs.wasteGeneration === "Average") {
    recommendations.push({
      category: "Waste",
      title: "Reduce & Recycle Waste",
      description: `Your ${carbonInputs.wasteGeneration.toLowerCase()} waste generation contributes to landfill emissions. Start composting organic waste, recycle properly, and reduce single-use plastics. Buy products with minimal packaging.`,
      priority: "Medium",
      impact: "Can reduce waste emissions by 30-50%",
    });
  }

  // Overall sustainability plan
  recommendations.push({
    category: "Action Plan",
    title: `Your ${carbonFootprint.category} Carbon Plan`,
    description: `With ${carbonFootprint.annual} tons CO₂/year (${carbonFootprint.category} category), your target is ${(carbonFootprint.annual * 0.7).toFixed(1)} tons. Start with the highest-impact actions above. Track monthly progress and celebrate milestones.`,
    priority: "High",
    impact: `Target: ${(carbonFootprint.annual * 0.3).toFixed(1)} tons reduction`,
  });

  return recommendations;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data: AIRequest = await req.json();
    const recommendations = await generateGeminiRecommendations(data);

    return new Response(JSON.stringify({ recommendations }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to generate recommendations" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
