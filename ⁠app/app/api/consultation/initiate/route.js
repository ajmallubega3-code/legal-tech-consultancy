import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, entityType, serviceType, details } = body;

    if (!name || !email || !serviceType) {
      return Response.json({ error: "Missing required parameters." }, { status: 400 });
    }

    // Audit tracking record aligned with Ugandan statutory frameworks (Companies Act, Insolvency Act, Advocates Act)
    const auditRecord = {
      timestamp: new Date().toISOString(),
      clientName: name,
      clientEmail: email,
      entityClassification: entityType,
      requestedService: serviceType,
      jurisdiction: "Republic of Uganda",
      regulatoryCompliance: [
        "The Constitution of the Republic of Uganda, 1995",
        "The Companies Act (Cap 110)",
        "The Insolvency Act (Cap 68)",
        "The Contracts Act"
      ],
      courtRepresentationStatus: "Excluded (Advisory & Drafting Only)",
      status: "Awaiting Financial Settlement Verification"
    };

    return Response.json({
      success: true,
      message: "Engagement contract successfully initialized under Ugandan jurisdiction.",
      audit: auditRecord
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal processing error." }, { status: 500 });
  }
}
