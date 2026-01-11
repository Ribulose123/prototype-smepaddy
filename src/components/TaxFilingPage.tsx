import { ArrowLeft, FileText, Download, CheckCircle, Calendar, DollarSign, Building, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { AmountInput } from './AmountInput';

interface TaxFilingPageProps {
  onBack: () => void;
}

type TaxYear = '2024' | '2025' | '2026';
type FilingStatus = 'not-started' | 'in-progress' | 'submitted';

export function TaxFilingPage({ onBack }: TaxFilingPageProps) {
  const [selectedYear, setSelectedYear] = useState<TaxYear>('2025');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('not-started');
  const [showFilingForm, setShowFilingForm] = useState(false);

  // Tax form data
  const [taxData, setTaxData] = useState({
    totalRevenue: '',
    costOfGoodsSold: '',
    operatingExpenses: '',
    otherIncome: '',
    taxPaid: '',
    tinNumber: ''
  });

  // Mock data - would come from backend
  const yearData = {
    '2024': {
      revenue: '15420000',
      expenses: '8750000',
      profit: '6670000',
      status: 'submitted' as FilingStatus
    },
    '2025': {
      revenue: '18920000',
      expenses: '10320000',
      profit: '8600000',
      status: 'in-progress' as FilingStatus
    },
    '2026': {
      revenue: '0',
      expenses: '0',
      profit: '0',
      status: 'not-started' as FilingStatus
    }
  };

  const currentYearData = yearData[selectedYear];

  // Calculate tax estimate (simplified Nigerian tax brackets)
  const calculateTaxEstimate = () => {
    const profit = parseInt(taxData.totalRevenue || '0') - 
                   parseInt(taxData.costOfGoodsSold || '0') - 
                   parseInt(taxData.operatingExpenses || '0');
    
    if (profit <= 0) return 0;

    // Simplified progressive tax (Nigerian CIT is typically 30% for companies, but SMEs may have relief)
    // Using simplified brackets for illustration
    if (profit <= 300000) return 0; // Small business relief
    if (profit <= 1000000) return profit * 0.07; // 7% for small
    if (profit <= 10000000) return profit * 0.15; // 15% for medium
    return profit * 0.30; // 30% for larger businesses
  };

  const estimatedTax = calculateTaxEstimate();
  const taxableProfit = parseInt(taxData.totalRevenue || '0') - 
                        parseInt(taxData.costOfGoodsSold || '0') - 
                        parseInt(taxData.operatingExpenses || '0');

  const handleSubmitTaxReturn = () => {
    if (!taxData.totalRevenue || !taxData.tinNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate submission
    toast.success('Tax return submitted successfully! 🎉');
    setShowFilingForm(false);
    setFilingStatus('submitted');
  };

  if (showFilingForm) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-6 lg:pb-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setShowFilingForm(false)}
              className="text-white flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Overview</span>
            </button>
            <h1 className="text-white text-2xl lg:text-3xl mb-2">Tax Return Form {selectedYear}</h1>
            <p className="text-blue-100">Fill in your business numbers - we'll calculate everything for you</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 lg:px-12 mt-6 lg:mt-8 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-semibold mb-1">Don't worry, we make it easy!</p>
                <p className="text-blue-800 text-sm">
                  Just enter your numbers - we'll handle the calculations and generate your tax forms automatically. 
                  All amounts should be in Naira (₦).
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Business Information */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  Business Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Tax Identification Number (TIN) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={taxData.tinNumber}
                      onChange={(e) => setTaxData({ ...taxData, tinNumber: e.target.value })}
                      placeholder="Enter your TIN"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Don't have a TIN? <a href="#" className="text-blue-600 hover:underline">Apply here</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Income Section */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Income (Money In)
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Total Revenue (All money from sales) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500">₦</span>
                      <AmountInput
                        value={taxData.totalRevenue}
                        onChange={(val) => setTaxData({ ...taxData, totalRevenue: val })}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      All money you received from selling products or services
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Other Income (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500">₦</span>
                      <AmountInput
                        value={taxData.otherIncome}
                        onChange={(val) => setTaxData({ ...taxData, otherIncome: val })}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Interest, rent, or any other money received
                    </p>
                  </div>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-600" />
                  Expenses (Money Out)
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Cost of Goods (What you paid for products you sold)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500">₦</span>
                      <AmountInput
                        value={taxData.costOfGoodsSold}
                        onChange={(val) => setTaxData({ ...taxData, costOfGoodsSold: val })}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Money you spent buying the products you sold
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Business Expenses (Other costs of running your business)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500">₦</span>
                      <AmountInput
                        value={taxData.operatingExpenses}
                        onChange={(val) => setTaxData({ ...taxData, operatingExpenses: val })}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rent, electricity, transport, salaries, etc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tax Paid */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-4">Tax Already Paid This Year</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Amount Already Paid (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">₦</span>
                    <AmountInput
                      value={taxData.taxPaid}
                      onChange={(val) => setTaxData({ ...taxData, taxPaid: val })}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Any tax payments or withholdings made during the year
                  </p>
                </div>
              </div>

              {/* Tax Summary */}
              {taxData.totalRevenue && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 lg:p-6 border-2 border-green-200">
                  <h3 className="text-gray-900 font-semibold mb-4">Your Tax Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Revenue:</span>
                      <span className="font-semibold text-gray-900">
                        ₦{parseInt(taxData.totalRevenue || '0').toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Expenses:</span>
                      <span className="font-semibold text-gray-900">
                        ₦{(parseInt(taxData.costOfGoodsSold || '0') + parseInt(taxData.operatingExpenses || '0')).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-px bg-green-300 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-semibold">Taxable Profit:</span>
                      <span className="font-bold text-green-700 text-xl">
                        ₦{taxableProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-semibold">Estimated Tax:</span>
                      <span className="font-bold text-blue-700 text-xl">
                        ₦{estimatedTax.toLocaleString()}
                      </span>
                    </div>
                    {taxData.taxPaid && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Already Paid:</span>
                        <span className="font-semibold text-gray-900">
                          -₦{parseInt(taxData.taxPaid).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="h-px bg-green-300 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-bold text-lg">Amount Due:</span>
                      <span className="font-bold text-green-700 text-2xl">
                        ₦{Math.max(0, estimatedTax - parseInt(taxData.taxPaid || '0')).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/50 rounded-xl p-3">
                    <p className="text-xs text-gray-700 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>
                        This is an estimate based on standard tax rates. Actual tax may vary based on deductions, 
                        reliefs, and specific regulations. Please consult with FIRS or a tax professional for precise calculations.
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col lg:flex-row gap-3">
                <button
                  onClick={() => setShowFilingForm(false)}
                  className="lg:flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => toast.info('Draft saved! You can continue later')}
                  className="lg:flex-1 bg-blue-50 text-blue-700 py-4 rounded-xl font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleSubmitTaxReturn}
                  className="lg:flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Tax Return</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 lg:px-12 pt-6 lg:pt-8 pb-6 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="text-white flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-white text-2xl lg:text-3xl mb-2">Tax Filing Made Easy</h1>
          <p className="text-blue-100">File your business taxes without stress - we guide you every step</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-12 mt-6 lg:mt-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Year Selection */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold mb-3">Select Tax Year</h3>
            <div className="flex gap-3">
              {(['2024', '2025', '2026'] as TaxYear[]).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Status Card */}
          <div className={`rounded-2xl p-6 mb-6 ${
            currentYearData.status === 'submitted'
              ? 'bg-green-50 border-2 border-green-200'
              : currentYearData.status === 'in-progress'
              ? 'bg-orange-50 border-2 border-orange-200'
              : 'bg-gray-50 border-2 border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 text-xl font-semibold mb-2">
                  Tax Year {selectedYear}
                </h3>
                <div className="flex items-center gap-2">
                  {currentYearData.status === 'submitted' && (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-semibold">Submitted</span>
                    </>
                  )}
                  {currentYearData.status === 'in-progress' && (
                    <>
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span className="text-orange-700 font-semibold">In Progress</span>
                    </>
                  )}
                  {currentYearData.status === 'not-started' && (
                    <>
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-semibold">Not Started</span>
                    </>
                  )}
                </div>
              </div>
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-white/80 rounded-xl p-4">
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-gray-900 font-bold text-xl">
                  ₦{parseInt(currentYearData.revenue).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <p className="text-gray-600 text-sm mb-1">Total Expenses</p>
                <p className="text-gray-900 font-bold text-xl">
                  ₦{parseInt(currentYearData.expenses).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-4">
                <p className="text-gray-600 text-sm mb-1">Net Profit</p>
                <p className="text-green-700 font-bold text-xl">
                  ₦{parseInt(currentYearData.profit).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              {currentYearData.status === 'submitted' ? (
                <>
                  <button
                    onClick={() => toast.success('Downloading tax return PDF...')}
                    className="flex-1 bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-200"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Tax Return</span>
                  </button>
                  <button
                    onClick={() => toast.info('Viewing submission details...')}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowFilingForm(true)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  <span>
                    {currentYearData.status === 'in-progress' ? 'Continue Filing' : 'Start Filing'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-2">Why File Taxes?</h4>
                  <p className="text-gray-600 text-sm">
                    Filing taxes helps you stay compliant with FIRS, access business loans, 
                    participate in government contracts, and build credibility for your business.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-2">We Make It Easy</h4>
                  <p className="text-gray-600 text-sm">
                    No accounting jargon! Just enter your numbers and we'll calculate everything, 
                    generate the forms, and guide you through submission.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-gray-900 font-semibold mb-3">Need Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Tax filing can feel overwhelming, but you're not alone. We're here to help you every step of the way.
            </p>
            <div className="flex flex-col lg:flex-row gap-3">
              <button
                onClick={() => toast.info('Opening tax guide...')}
                className="flex-1 bg-white text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200"
              >
                Read Tax Guide
              </button>
              <button
                onClick={() => toast.info('Connecting to support...')}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Talk to Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
