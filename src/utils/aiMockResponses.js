// Mock AI responses — replace fetch() in ComposerAIGenerator with this
// When backend is ready, delete this file and point to /api/ai/generate instead

export const AI_MOCK_RESPONSES = [
  {
    keywords: ['sneaker', 'shoe', 'footwear', 'kick'],
    captions: [
      'These aren\'t just shoes. They\'re a statement. Drop incoming.',
      'What\'s your next move? Ours starts from the ground up.',
      'Every great journey starts with the right pair. You ready?',
    ],
    hashtags: ['#SneakerHead','#NewDrop','#KickGame','#StreetStyle','#SneakerCommunity','#FreshKicks','#SneakerCulture','#Footwear','#StyleCheck','#LimitedEdition'],
    best_time: 'Thursday 7–9pm or Saturday 10am–12pm',
    tip: 'Post a close-up detail shot first as a teaser — saves the full reveal for 24hrs later to double your reach.',
  },
  {
    keywords: ['launch', 'product', 'release', 'new', 'drop'],
    captions: [
      'The wait is over. Meet the product that changes everything.',
      'We built this for you. Now it\'s yours — link in bio.',
      'From concept to reality. Introducing something we\'re proud of.',
    ],
    hashtags: ['#ProductLaunch','#NewRelease','#Innovation','#JustDropped','#BehindTheProduct','#BuildInPublic','#Startup','#MadeWithLove','#ProductHunt','#Launch'],
    best_time: 'Tuesday or Wednesday 9–11am',
    tip: 'Pin a comment with your CTA link immediately after posting — the algorithm treats pinned comments as engagement signals.',
  },
  {
    keywords: ['food', 'recipe', 'eat', 'cook', 'restaurant', 'meal'],
    captions: [
      'Good food is the only thing worth stopping for. Come eat.',
      'You don\'t need a reason. You just need a fork.',
      'Comfort in every bite. This one hits different.',
    ],
    hashtags: ['#FoodPhotography','#FoodBlogger','#Foodie','#EatLocal','#ChefLife','#HomeCook','#FoodLover','#InstaFood','#DailyFood','#GoodEats'],
    best_time: 'Friday 11am–1pm or Sunday 5–7pm',
    tip: 'Always film the steam — it makes food look fresh and irresistible. Shoot within 60 seconds of plating.',
  },
  {
    keywords: ['fitness', 'workout', 'gym', 'health', 'exercise', 'training'],
    captions: [
      'Your future self is watching. Make it count today.',
      'The gym doesn\'t build character. Showing up does.',
      'Progress isn\'t always visible — but it\'s always real.',
    ],
    hashtags: ['#FitnessMotivation','#WorkoutLife','#GymLife','#HealthyLiving','#TrainHard','#FitFam','#SweatSession','#NoExcuses','#BodyTransformation','#ActiveLifestyle'],
    best_time: 'Monday or Wednesday 6–8am',
    tip: 'Post your worst days too — authenticity outperforms perfection every time in fitness content.',
  },
  {
    keywords: ['travel', 'trip', 'adventure', 'explore', 'destination'],
    captions: [
      'Not all those who wander are lost. Some just found better WiFi.',
      'The world is too big to stay in one place. Go somewhere new.',
      'Every destination changes you a little. This one changed everything.',
    ],
    hashtags: ['#TravelGram','#Wanderlust','#ExploreMore','#TravelPhotography','#AdventureAwaits','#SeeTheWorld','#TravelBlogger','#NatureLovers','#PassportReady','#GetOutside'],
    best_time: 'Saturday 8–10am',
    tip: 'Always geotag your exact location — posts with location tags get 79% more engagement than those without.',
  },
  {
    keywords: ['business', 'entrepreneur', 'startup', 'growth', 'brand'],
    captions: [
      'Building something people actually need. This is what that looks like.',
      'The best brands don\'t sell products. They build communities.',
      'Behind every great business is a team that believed before the results did.',
    ],
    hashtags: ['#Entrepreneur','#BusinessGrowth','#StartupLife','#BuildInPublic','#SmallBusiness','#BrandBuilding','#Founder','#BusinessTips','#GrowthMindset','#Hustle'],
    best_time: 'Tuesday 8–10am or Thursday 12–2pm',
    tip: 'Share your revenue numbers or growth metrics — transparency drives trust and trust drives followers.',
  },
  {
    keywords: ['fashion', 'style', 'outfit', 'ootd', 'clothing', 'wear'],
    captions: [
      'Style is knowing who you are. Fashion is knowing what to wear.',
      'This outfit didn\'t happen by accident. Neither does confidence.',
      'Dress like you\'re already where you want to be.',
    ],
    hashtags: ['#OOTD','#FashionBlogger','#StyleInspo','#FashionPhotography','#StreetFashion','#WhatIWore','#FashionDaily','#StyleFile','#OutfitOfTheDay','#FashionWeek'],
    best_time: 'Friday 3–5pm or Sunday 12–2pm',
    tip: 'Use a consistent preset or filter across all posts — visual consistency grows your following 3x faster than random aesthetics.',
  },
  {
    keywords: ['tech', 'software', 'app', 'digital', 'ai', 'tool'],
    captions: [
      'We didn\'t build a tool. We built a shortcut to what matters.',
      'The future of work is already here. You\'re just not using it yet.',
      'Less time on the how. More time on the why. That\'s the point.',
    ],
    hashtags: ['#TechNews','#SoftwareEngineering','#AITools','#ProductivityHacks','#TechTwitter','#BuildInPublic','#NoCode','#SaaS','#DigitalTransformation','#FutureOfWork'],
    best_time: 'Tuesday or Thursday 9–11am',
    tip: 'Show your tool in action with a 15-second screen recording — demos outperform static images by 3x on every platform.',
  },
];

// Default fallback response when no keywords match
export const DEFAULT_AI_RESPONSE = {
  captions: [
    'The moment you\'ve been waiting for. Here it is.',
    'Not everything needs an explanation. Some things just feel right.',
    'We made something. Come see what all the noise is about.',
  ],
  hashtags: ['#Content','#CreativeWork','#MadeThis','#SharedMoment','#Daily','#Authentic','#RealLife','#Community','#Connection','#Storytelling'],
  best_time: 'Tuesday or Thursday 9am–11am',
  tip: 'Post consistently at the same time for 30 days — the algorithm rewards predictability more than virality.',
};

/**
 * Simulates an AI API call with a realistic delay.
 * When your backend is ready, replace this entire function with:
 *
 *   const res = await fetch('/api/ai/generate', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ description }),
 *   });
 *   return await res.json();
 */
export async function generateAICaption(description) {
  // Simulate network latency (800ms–1.4s)
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const lower = description.toLowerCase();

  // Find the best matching response by keywords
  const match = AI_MOCK_RESPONSES.find((r) =>
    r.keywords.some((kw) => lower.includes(kw))
  );

  const base = match ?? DEFAULT_AI_RESPONSE;

  // Shuffle hashtags slightly for variety
  const shuffled = [...base.hashtags].sort(() => Math.random() - 0.5);

  return {
    captions: base.captions,
    hashtags: shuffled,
    best_time: base.best_time,
    tip: base.tip,
  };
}