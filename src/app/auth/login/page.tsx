import { LoginForm } from '@/components/login-form';

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#2e2e2e] flex items-center justify-center p-6 md:p-10 overflow-hidden">
      {/* Background red circles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-12 h-12 bg-red-500 rounded-full opacity-10"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-red-500 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-red-500 rounded-full opacity-8"></div>
        <div className="absolute top-1/2 left-1/4 w-14 h-14 bg-red-500 rounded-full opacity-12"></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-red-500 rounded-full opacity-6"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-red-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-red-500 rounded-full opacity-14"></div>
        <div className="absolute top-3/4 right-1/3 w-12 h-12 bg-red-500 rounded-full opacity-20"></div>
        <div className="absolute top-1/3 left-2/3 w-22 h-22 bg-red-500 rounded-full opacity-9"></div>
        <div className="absolute bottom-2/3 right-2/3 w-18 h-18 bg-red-500 rounded-full opacity-11"></div>
      </div>

      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
