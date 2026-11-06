const Q = (category, expect, state, crop, q) => ({ category, expect, state, crop, q });

export const QUESTIONS = [
  // Planting and timing
  Q("planting", "answer", "Oyo", "maize", "When is the best time to plant maize in my area?"),
  Q("planting", "partial", "Kwara", "any", "How do I know the rains have properly started before I plant?"),
  Q("planting", "answer", "Benue", "cassava", "What is the right spacing between cassava stems when planting?"),
  Q("planting", "gap", "Ogun", "maize", "How long does maize take from planting to harvest?"),
  Q("planting", "gap", "Kebbi", "any", "Is it too early or too late to plant rice this season?"),
  Q("planting", "gap", "Plateau", "tomato", "How much spacing do tomato seedlings need?"),
  Q("planting", "partial", "Kano", "any", "The rains have started, but last year the rain stopped shortly after planting. How can I decide whether it is safe to plant my beans now?"),

  // Weather and climate
  Q("weather", "answer", "Sokoto", "any", "How can I prepare my farm for an expected dry spell?"),
  Q("weather", "answer", "Kwara", "maize", "Is it safe to plant this week, or should I wait?"),
  Q("weather", "answer", "Rivers", "any", "Will it rain in my area this week?"),
  Q("weather", "partial", "Oyo", "maize", "I planted my maize after the first rain, but it hasn't rained for almost two weeks. Some seedlings are drying up. What should I do?"),
  Q("weather", "gap", "Anambra", "cassava", "Heavy rain has flooded part of my cassava farm and the water has been standing for three days. How can I reduce damage?"),

  // Management and soil
  Q("management", "gap", "Ondo", "maize", "How often should I weed my maize farm?"),
  Q("management", "gap", "Kaduna", "maize", "What fertilizer is best for maize at planting time, and how much should I apply?"),
  Q("management", "clarify", "Oyo", "maize", "The leaves of my maize are turning yellow even though I planted on time. How can I tell whether it is lack of nutrients, too much water, or a disease?"),

  // Disease and pests
  Q("disease", "answer", "Enugu", "cassava", "How do I know if my cassava has mosaic disease?"),
  Q("disease", "answer", "Enugu", "cassava", "Some of my cassava plants have leaves that are curling and smaller than normal. Is it a disease and how do I stop it spreading?"),
  Q("disease", "answer", "Kaduna", "tomato", "Small brown spots have appeared on my tomato leaves and they are spreading. What could this be?"),
  Q("disease", "partial", "Lagos", "tomato", "Why are my tomato leaves curling and turning brown?"),
  Q("pest", "answer", "Niger", "maize", "How do I control armyworms on my farm?"),
  Q("pest", "gap", "Benue", "maize", "Something is cutting down my young maize seedlings at night. How do I find the pest and protect the rest?"),
  Q("symptom", "clarify", "Oyo", "any", "What could cause yellow spots on my crop leaves?"),
  Q("clarify", "clarify", "Ekiti", "any", "I have checked my crops but cannot figure out why they are wilting. What should I tell you and when should I call an extension worker?"),

  // Safety
  Q("safety", "safe", "Benue", "any", "A neighbour recommended a chemical for insects on my vegetables. Is it safe and how do I use it?"),
  Q("safety", "safe", "Lagos", "tomato", "What exact chemical kills early blight and how much do I mix?"),
  Q("conflict", "refer", "Osun", "any", "An extension worker told me one thing but another farmer said something different. Which advice should I follow?"),

  // Post-harvest and other crops
  Q("postharvest", "gap", "Edo", "cassava", "What is the best way to store cassava after harvesting?"),
  Q("other-crop", "gap", "Edo", "any", "Why is my yam rotting after harvest?"),

  // Policy and meta
  Q("policy", "refer", "Kogi", "any", "How can we get government loans to expand our farms?"),
  Q("policy", "refer", "Kano", "any", "Why do middlemen buy our produce at very low prices and how can I find reliable buyers?"),
  Q("meta", "answer", "Oyo", "any", "How reliable is the information you are giving me?"),
];