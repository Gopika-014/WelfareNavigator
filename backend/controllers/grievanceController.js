const Grievance = require("../models/Grievance");
const formidable = require('formidable');
//const stringSimilarity = require("string-similarity");

// Submit grievance
exports.submitGrievance = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ success: false, message: "Error parsing form" });
    }

    // Extract fields from the form
    const { category, description } = fields;
    
    // If fields are arrays, extract their first value (if only one value is expected)
    const categoryString = Array.isArray(category) ? category[0] : category;
    const descriptionString = Array.isArray(description) ? description[0] : description;

    console.log("Category:", categoryString);
    console.log("Description:", descriptionString);

    // Check if category and description are provided
    if (!categoryString || !descriptionString) {
      return res.status(400).json({ success: false, message: "Category and description are required." });
    }

    // Create a new grievance
    const grievance = new Grievance({
      user: req.user.id,  // Assuming you are passing user info in a middleware
      category: categoryString,
      description: descriptionString,
    });

    // Save grievance to database
    grievance.save()
      .then((grievance) => {
        return res.status(201).json({
          success: true,
          message: "Grievance submitted successfully",
          grievance,
        });
      })
      .catch((error) => {
        console.error("Error saving grievance:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      });
  });
};



// ✅ Get grievances for the logged-in user
exports.getUserGrievances = async (req, res) => {
  try {
    console.log("Fetching grievances for user:", req.user.id);
    const grievances = await Grievance.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (!grievances.length) {
      return res.status(404).json({ success: false, message: "No grievances found" });
    }

    res.status(200).json({ success: true, grievances });
  } catch (error) {
    console.error("Error fetching user grievances:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get grievances by user ID (Admin Only)
exports.getGrievancesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("Fetching grievances for user ID:", userId);

    const grievances = await Grievance.find({ user: userId }).sort({ createdAt: -1 });

    if (!grievances.length) {
      return res.status(404).json({ success: false, message: "No grievances found for this user" });
    }

    res.status(200).json({ success: true, grievances });
  } catch (error) {
    console.error("Error fetching grievances by user ID:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all grievances (Admin Only)
/*exports.getAllGrievances = async (req, res) => {
  try {
    console.log("Fetching all grievances...");
    const grievances = await Grievance.find().populate("user", "name email").sort({ createdAt: -1 });
    console.log("Grievances:", grievances);
    res.status(200).json({ success: true, grievances });
  } catch (error) {
    console.error("Error fetching all grievances:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};*/
// ✅ Get all grievances (Admin Only)
exports.getAllGrievances = async (req, res) => {
  try {
    console.log("Fetching all grievances...");
    const grievances = await Grievance.find().populate("user", "name email").sort({ createdAt: -1 });

    if (!grievances || grievances.length === 0) {
      return res.status(404).json({ success: false, message: "No grievances found" });
    }

    // Always send the response as an array
    res.status(200).json({ success: true, grievances: grievances || [] });
  } catch (error) {
    console.error("Error fetching all grievances:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// ✅ Admin resolves a grievance
exports.resolveGrievance = async (req, res) => {
  try {
    console.log("reached backend grievance");
    const grievance = await Grievance.findById(req.params.id);
    
    if (!grievance) {
      return res.status(404).json({ success: false, message: "Grievance not found" });
    }

    grievance.status = "Resolved";
    grievance.adminResponse = req.body.response || "Resolved by Admin";
    await grievance.save();

    res.status(200).json({ success: true, message: "Grievance resolved", grievance });
  } catch (error) {
    console.error("Error resolving grievance:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const faqs = [
  {
    category: "Grievance Related Questions",
    questions: [
      {
        q: "How do I submit a grievance?",
        a: "Go to the 'Submit Grievance' section, fill in the details, and click submit.",
        link: "/grievance",
      },
      {
        q: "Can I track my grievance status?",
        a: "Yes, you can track the status in the 'My Grievances' section.",
        link: "/grievances/status",
      },
      {
        q: "How long does it take to resolve a grievance?",
        a: "Resolution time varies, but you will receive updates via email and dashboard notifications.",
      },
      {
        q: "What should I do if my grievance is not resolved?",
        a: "You can escalate the grievance by providing additional details in the grievance follow-up section.",
        link: "/grievances/escalate",
      },
    ],
  },
  {
    category: "Common Queries (Account, Login, Email)",
    questions: [
      {
        q: "How do I register on the platform?",
        a: "Click on 'Register', fill in the required details.",
        link: "/register",
      },
      {
        q: "What should I do if I forgot my password?",
        a: "Click 'Forgot Password', enter your email, and follow the reset instructions sent to your email.",
        link: "/forgot-password",
      },
      {
        q: "Can I change my registered email?",
        a: "No, email addresses cannot be changed after registration for security reasons.",
      },
    ],
  },
  {
    category: "Eligibility Related Questions",
    questions: [
      {
        q: "How can I check my eligibility for government schemes?",
        a: "Use our 'Eligibility Checker' to enter your details and find suitable schemes.",
        link: "/check",
      },
      {
        q: "What factors determine my eligibility?",
        a: "Eligibility is based on factors like income, age, gender, location, and socio-economic status.",
      },
      {
        q: "Do I need to upload any documents for eligibility check?",
        a: "No, you only need to enter basic details. However, documents are required while applying for schemes.",
      },
    ],
  },
  {
    category: "Scheme Search & Filters",
    questions: [
      {
        q: "How can I search for schemes?",
        a: "Use the 'Explore Schemes' section and apply filters like age, gender, state, category, etc.",
        link: "/schemes",
      },
      {
        q: "Can I filter schemes based on my state?",
        a: "Yes, you can filter schemes based on your state and region.",
      },
      {
        q: "Are both state and central government schemes available?",
        a: "Yes, our platform includes both central and state government schemes.",
      },
    ],
  },
];


// Additional common chatbot responses
const chatbotResponses = [
  {
    question: "how to file a grievance",
    response:
      "To file a grievance, go to the grievances section, select a category, and describe your issue.",
    link: "/grievance",
  },
  {
    question: "check grievance status",
    response:
      "Log in and visit the 'My Grievances' section to check your grievance status.",
    link: "/grievance",
  },
  {
    question: "recommend a scheme",
    response:
      "Log in to get personalized scheme recommendations based on your profile.",
    link: "/schemes",
  },
  {
    question: "how to apply for a scheme",
    response:
      "Visit the scheme details page after logging in to find the application process and link.",
    link: "/schemes",
  },
  {
    question: "how to update my profile",
    response:
      "You can update your profile from the dashboard under 'View Profile'.",
    link: "/profile/edit",
  },
  {
    question: "last date for scheme",
    response:
      "Scheme opening and closing dates are updated as soon as official notifications arrive.",
    link: "/schemes",
  },
  {
    question: "need more help",
    response:
      "If you need further assistance, email citizenaidschemes@gmail.com or submit a grievance.",
    link: "/contact",
  },
];

// **Chatbot Response Logic (Fuzzy Matching)**
const stringSimilarity = require("string-similarity");

exports.getChatbotResponse = (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let bestMatch = { score: 0, reply: "Sorry, I couldn't understand that. Please try again or check our FAQ section.", link: "/faq" };

  // Check in FAQ categories
  for (const category of faqs) {
    for (const question of category.questions) {
      let similarity = stringSimilarity.compareTwoStrings(userMessage, question.q.toLowerCase());
      if (similarity > bestMatch.score) {
        bestMatch = { score: similarity, reply: question.a, link: question.link || null };
      }
    }
  }

  // Check in common chatbot responses
  for (const item of chatbotResponses) {
    let similarity = stringSimilarity.compareTwoStrings(userMessage, item.question);
    if (similarity > bestMatch.score) {
      bestMatch = { score: similarity, reply: item.response, link: item.link };
    }
  }

  // **Set a similarity threshold (adjustable)**
  const SIMILARITY_THRESHOLD = 0.4; // 40% match required
  if (bestMatch.score >= SIMILARITY_THRESHOLD) {
    return res.json({ reply: bestMatch.reply, link: bestMatch.link });
  }

  // Default response when no match is found
  return res.json({ reply: "Sorry, I couldn't understand that. Please try again or check our FAQ section.", link: "/faq" });
};
