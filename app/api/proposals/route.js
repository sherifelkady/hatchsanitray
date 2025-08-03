import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("=== API Route Debug ===");

    // استخراج FormData من الطلب
    const formData = await request.formData();

    // طباعة البيانات الواردة
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, typeof value === "object" ? "File object" : value);
    }

    const targetUrl = "https://apis.hatchsanitary.com/api/proposals";
    console.log("Target URL:", targetUrl);

    // إعادة توجيه الطلب إلى الـ API الأصلي
    console.log("Sending request to external API...");
    const response = await fetch(targetUrl, {
      method: "POST",
      body: formData,
      // لا تضع Content-Type header - FormData سيضعه تلقائياً
    });

    console.log("Response Status:", response.status);
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    // قراءة الاستجابة كنص أولاً
    const responseText = await response.text();
    console.log("Response Text:", responseText.substring(0, 500)); // أول 500 حرف فقط

    // التحقق من نجاح الطلب
    if (!response.ok) {
      console.error("API Error:", response.status, responseText);
      return NextResponse.json(
        {
          error: `API Error: ${response.status}`,
          details: responseText.substring(0, 200),
          fullUrl: "https://apis.hatchsanitary.com/api/proposals",
        },
        { status: response.status }
      );
    }

    // محاولة تحويل النص إلى JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("JSON Parse Error:", jsonError);
      console.error("Response was:", responseText.substring(0, 200));
      return NextResponse.json(
        {
          error: "Invalid JSON response from API",
          details: "Server returned HTML instead of JSON",
          responsePreview: responseText.substring(0, 200),
        },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Proxy API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// للتعامل مع OPTIONS request (preflight)
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
