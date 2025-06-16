"use client";
import React, { useState, useRef } from "react";
import {
  Download,
  Upload,
  User,
  Lock,
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
} from "lucide-react";

const HatchSanitraySystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "منتج التنظيف الطبي",
      category: "تنظيف",
      price: 150,
      description: "منتج عالي الجودة للتنظيف الطبي",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "معقم اليدين",
      category: "تعقيم",
      price: 75,
      description: "معقم طبي فعال ضد الفيروسات والبكتيريا",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "مناديل معقمة",
      category: "تنظيف",
      price: 45,
      description: "مناديل معقمة للاستخدام الطبي",
      image: "/api/placeholder/300/200",
    },
  ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [presentationData, setPresentationData] = useState({
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientPhone: "",
    companyLogo: null,
    clientLogo: null,
    notes: "",
  });

  const fileInputRef = useRef(null);
  const clientLogoRef = useRef(null);

  // Mock users for demo
  const users = [
    { username: "admin", password: "123456", name: "المدير العام" },
    { username: "sales1", password: "123456", name: "مندوب المبيعات الأول" },
    { username: "sales2", password: "123456", name: "مندوب المبيعات الثاني" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setCurrentPage("dashboard");
    } else {
      alert("بيانات تسجيل الدخول غير صحيحة");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
    setSelectedProducts([]);
    setPresentationData({
      clientName: "",
      clientCompany: "",
      clientEmail: "",
      clientPhone: "",
      companyLogo: null,
      clientLogo: null,
      notes: "",
    });
  };

  const toggleProductSelection = (product) => {
    const isSelected = selectedProducts.find((p) => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const updateProductQuantity = (productId, quantity) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === productId ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const handleFileUpload = (file, type) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPresentationData((prev) => ({
        ...prev,
        [type]: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const generatePDF = () => {
    // Mock PDF generation
    const pdfContent = `
      العرض التقديمي لشركة ${presentationData.clientCompany}
      العميل: ${presentationData.clientName}
      
      المنتجات المختارة:
      ${selectedProducts
        .map(
          (p) =>
            `- ${p.name} - الكمية: ${p.quantity} - السعر: ${
              p.price * p.quantity
            } جنيه`
        )
        .join("\n")}
      
      إجمالي المبلغ: ${selectedProducts.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      )} جنيه
      
      ملاحظات: ${presentationData.notes}
    `;

    // Create downloadable text file (simulating PDF)
    const blob = new Blob([pdfContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `عرض-${
      presentationData.clientCompany
    }-${new Date().toLocaleDateString("ar-EG")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("تم إنشاء العرض التقديمي بنجاح!");
  };

  // Login Page
  if (currentPage === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hatch Sanitray
            </h1>
            <p className="text-gray-600">نظام إدارة العروض التقديمية</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل اسم المستخدم"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">بيانات تجريبية:</p>
            <p className="text-xs text-gray-500">admin / 123456</p>
            <p className="text-xs text-gray-500">sales1 / 123456</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-2xl font-bold text-gray-900">
                Hatch Sanitray
              </h1>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">أهلاً {currentUser.name}</span>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setCurrentPage("products")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "products"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                اختيار المنتجات
              </button>

              <button
                onClick={() => setCurrentPage("presentation")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "presentation"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                العرض التقديمي
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Selection Page */}
        {currentPage === "products" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                اختيار المنتجات
              </h2>
              <p className="text-gray-600">
                اختر المنتجات المطلوبة للعرض التقديمي
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const isSelected = selectedProducts.find(
                  (p) => p.id === product.id
                );
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : "hover:shadow-lg"
                    }`}
                    onClick={() => toggleProductSelection(product)}
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-6xl text-blue-500">📦</div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">
                          {product.price} جنيه
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {product.category}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            الكمية
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={isSelected.quantity}
                            onChange={(e) =>
                              updateProductQuantity(
                                product.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedProducts.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  المنتجات المختارة ({selectedProducts.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          الكمية: {product.quantity}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-blue-600">
                          {product.price * product.quantity} جنيه
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">إجمالي المبلغ:</span>
                    <span className="text-xl font-bold text-green-600">
                      {selectedProducts.reduce(
                        (total, p) => total + p.price * p.quantity,
                        0
                      )}{" "}
                      جنيه
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Presentation Page */}
        {currentPage === "presentation" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                إعداد العرض التقديمي
              </h2>
              <p className="text-gray-600">
                أدخل بيانات العميل وقم بتحميل الشعارات
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Client Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  بيانات العميل
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اسم العميل
                    </label>
                    <input
                      type="text"
                      value={presentationData.clientName}
                      onChange={(e) =>
                        setPresentationData((prev) => ({
                          ...prev,
                          clientName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل اسم العميل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اسم الشركة
                    </label>
                    <input
                      type="text"
                      value={presentationData.clientCompany}
                      onChange={(e) =>
                        setPresentationData((prev) => ({
                          ...prev,
                          clientCompany: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل اسم الشركة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={presentationData.clientEmail}
                      onChange={(e) =>
                        setPresentationData((prev) => ({
                          ...prev,
                          clientEmail: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل البريد الإلكتروني"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={presentationData.clientPhone}
                      onChange={(e) =>
                        setPresentationData((prev) => ({
                          ...prev,
                          clientPhone: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل رقم الهاتف"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      value={presentationData.notes}
                      onChange={(e) =>
                        setPresentationData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل أي ملاحظات إضافية"
                    />
                  </div>
                </div>
              </div>

              {/* Logos Upload */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    تحميل الشعارات
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شعار المؤسسة
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e.target.files[0], "companyLogo")
                          }
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          انقر لتحميل شعار المؤسسة
                        </button>
                        {presentationData.companyLogo && (
                          <p className="text-green-600 text-sm mt-2">
                            تم تحميل الشعار بنجاح
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شعار العميل
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <input
                          type="file"
                          ref={clientLogoRef}
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e.target.files[0], "clientLogo")
                          }
                          className="hidden"
                        />
                        <button
                          onClick={() => clientLogoRef.current?.click()}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          انقر لتحميل شعار العميل
                        </button>
                        {presentationData.clientLogo && (
                          <p className="text-green-600 text-sm mt-2">
                            تم تحميل الشعار بنجاح
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview & Generate */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    معاينة العرض
                  </h3>

                  {selectedProducts.length > 0 &&
                  presentationData.clientName &&
                  presentationData.clientCompany ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p>
                          <span className="font-medium">العميل:</span>{" "}
                          {presentationData.clientName}
                        </p>
                        <p>
                          <span className="font-medium">الشركة:</span>{" "}
                          {presentationData.clientCompany}
                        </p>
                        <p>
                          <span className="font-medium">عدد المنتجات:</span>{" "}
                          {selectedProducts.length}
                        </p>
                        <p>
                          <span className="font-medium">إجمالي المبلغ:</span>{" "}
                          {selectedProducts.reduce(
                            (total, p) => total + p.price * p.quantity,
                            0
                          )}{" "}
                          جنيه
                        </p>
                      </div>

                      <button
                        onClick={generatePDF}
                        className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-medium"
                      >
                        <Download className="h-5 w-5" />
                        <span>تحميل العرض التقديمي (PDF)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p>
                        يرجى اختيار المنتجات وملء بيانات العميل لإنشاء العرض
                        التقديمي
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Home */}
        {currentPage === "dashboard" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                لوحة التحكم
              </h2>
              <p className="text-gray-600">
                مرحباً بك في نظام إدارة العروض التقديمية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    إجمالي المنتجات
                  </h3>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {products.length}
                </p>
                <p className="text-gray-600 text-sm mt-1">منتج متاح</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    المنتجات المختارة
                  </h3>
                  <div className="p-3 bg-green-100 rounded-full">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {selectedProducts.length}
                </p>
                <p className="text-gray-600 text-sm mt-1">منتج مختار</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    إجمالي القيمة
                  </h3>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {selectedProducts.reduce(
                    (total, p) => total + p.price * p.quantity,
                    0
                  )}
                </p>
                <p className="text-gray-600 text-sm mt-1">جنيه مصري</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  إجراءات سريعة
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentPage("products")}
                    className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>اختيار منتجات جديدة</span>
                  </button>

                  <button
                    onClick={() => setCurrentPage("presentation")}
                    className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                    <span>إنشاء عرض تقديمي</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  معلومات النظام
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">المستخدم الحالي:</span>{" "}
                    {currentUser.name}
                  </p>
                  <p>
                    <span className="font-medium">التاريخ:</span>{" "}
                    {new Date().toLocaleDateString("ar-EG")}
                  </p>
                  <p>
                    <span className="font-medium">الوقت:</span>{" "}
                    {new Date().toLocaleTimeString("ar-EG")}
                  </p>
                  <p>
                    <span className="font-medium">حالة النظام:</span>{" "}
                    <span className="text-green-600">متصل</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                النشاط الحديث
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">تم تسجيل الدخول بنجاح</p>
                    <p className="text-xs text-gray-500">
                      {new Date().toLocaleString("ar-EG")}
                    </p>
                  </div>
                </div>

                {selectedProducts.length > 0 && (
                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        تم اختيار {selectedProducts.length} منتج
                      </p>
                      <p className="text-xs text-gray-500">منذ قليل</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HatchSanitraySystem;
