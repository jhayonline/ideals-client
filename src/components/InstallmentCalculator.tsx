import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatGHS } from "@/lib/format";
import { Calendar, Clock, Percent } from "lucide-react";

type Deposit = 40 | 60;
type Plan = "weekly" | "monthly";

export type InstallmentSelection = {
  deposit: Deposit;
  plan: Plan;
  depositAmount: number;
  balance: number;
  perPayment: number;
  installments: number;
};

export default function InstallmentCalculator({
  price,
  onChange,
}: {
  price: number;
  onChange?: (s: InstallmentSelection) => void;
}) {
  const [deposit, setDeposit] = useState<Deposit>(40);
  const [plan, setPlan] = useState<Plan>("monthly");

  const data = useMemo<InstallmentSelection>(() => {
    const depositAmount = (price * deposit) / 100;
    const balance = price - depositAmount;
    const installments = plan === "weekly" ? 12 : 3;
    const perPayment = balance / installments;
    return { deposit, plan, depositAmount, balance, perPayment, installments };
  }, [price, deposit, plan]);

  useMemo(() => onChange?.(data), [data, onChange]);

  const totalPaid = data.depositAmount + data.perPayment * data.installments;
  const savings = price - totalPaid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-gray-50/80 to-white border border-gray-100/80 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Percent size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Installment plan
            </h3>
            <p className="text-[11px] text-gray-400">Pay over time</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Total price</div>
          <div className="text-sm font-semibold text-gray-900">
            {formatGHS(price)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-2">
            <Percent size={12} /> Deposit
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100/80 rounded-xl">
            {[40, 60].map((d) => (
              <button
                key={d}
                onClick={() => setDeposit(d as Deposit)}
                className={`h-10 rounded-lg text-sm font-medium transition-all ${
                  deposit === d
                    ? "bg-white text-primary shadow-sm ring-1 ring-primary/20"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {d}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-2">
            <Calendar size={12} /> Schedule
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100/80 rounded-xl">
            {[
              { v: "weekly", label: "Weekly", sub: "12 wks" },
              { v: "monthly", label: "Monthly", sub: "3 mo" },
            ].map((p) => (
              <button
                key={p.v}
                onClick={() => setPlan(p.v as Plan)}
                className={`h-10 rounded-lg text-sm font-medium transition-all ${
                  plan === p.v
                    ? "bg-white text-primary shadow-sm ring-1 ring-primary/20"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {p.label}
                <span className="block text-[10px] font-normal text-gray-400">
                  {p.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${deposit}-${plan}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Deposit
                </div>
                <div className="text-lg font-semibold text-gray-900 mt-0.5">
                  {formatGHS(data.depositAmount)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Balance
                </div>
                <div className="text-lg font-semibold text-gray-900 mt-0.5">
                  {formatGHS(data.balance)}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    {plan === "weekly" ? "Per week" : "Per month"}
                  </div>
                  <div className="text-2xl font-bold text-primary mt-0.5 tracking-tight">
                    {formatGHS(data.perPayment)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Payments
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mt-0.5">
                    {data.installments} × {plan === "weekly" ? "wk" : "mo"}
                  </div>
                </div>
              </div>
              {savings > 0 && (
                <div className="mt-3 text-[10px] text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full inline-block">
                  Save {formatGHS(savings)} vs. full price
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
