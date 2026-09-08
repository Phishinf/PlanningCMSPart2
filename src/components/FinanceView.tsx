import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  DollarSign,
  PieChart as PieIcon,
  TrendingUp,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Globe2,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';
import { DepartmentId } from '../types';

export const FinanceView: React.FC = () => {
  const { budgets, canEditFinance, recordExpenditure, departments } = useChurch();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expenseModalItem, setExpenseModalItem] = useState<{ deptId: DepartmentId; itemId: string; name: string } | null>(null);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const totalAllocated = budgets.reduce((acc, b) => acc + b.totalAllocation, 0);
  const totalSpent = budgets.reduce(
    (acc, b) => acc + b.items.reduce((s, it) => s + it.spentAmount, 0),
    0
  );
  const totalCommitted = budgets.reduce(
    (acc, b) => acc + b.items.reduce((s, it) => s + it.committedAmount, 0),
    0
  );
  const totalRemaining = totalAllocated - (totalSpent + totalCommitted);
  const burnRatePct = Math.round(((totalSpent + totalCommitted) / totalAllocated) * 100);

  const allItems = budgets.flatMap(b =>
    b.items.map(it => ({
      ...it,
      departmentId: b.departmentId,
      departmentName: b.departmentName
    }))
  );

  const filteredItems = allItems.filter(item => {
    const matchesDept = selectedDeptFilter === 'all' || item.departmentId === selectedDeptFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Ministry', 'Code', 'Line Item Name', 'Category', 'Allocated ($)', 'Spent ($)', 'Committed ($)', 'Remaining ($)', 'Page Ref'];
    const rows = filteredItems.map(item => [
      `"${item.departmentName}"`,
      `"${item.code}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      item.allocatedAmount,
      item.spentAmount,
      item.committedAmount,
      item.allocatedAmount - (item.spentAmount + item.committedAmount),
      `"${item.pageRef}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Church_Budget_Master_Ledger_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmExpense = () => {
    if (expenseModalItem && expenseAmount > 0) {
      recordExpenditure(expenseModalItem.deptId, expenseModalItem.itemId, expenseAmount);
      setExpenseModalItem(null);
      setExpenseAmount(0);
    }
  };

  const deptMeta = {
    worship: { icon: Building2, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    mission: { icon: Globe2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    training: { icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
    service: { icon: HeartHandshake, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' }
  };

  return (
    <div className="space-y-6">
      {/* Top Ledger Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
              <DollarSign className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-500 text-slate-950 uppercase tracking-wider">
                  Pages 19, 22, 26, 30
                </span>
                <span className="text-xs text-slate-400 font-mono">ANNUAL COMBINED BUDGET</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Global Financial Ledger Module
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Centralized financial core consolidating all 4 ministry cost centers with real-time disbursement controls.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Ledger</span>
            </button>
          </div>
        </div>

        {!canEditFinance && (
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-amber-200/80">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Treasurer permissions required to execute disbursements. Switch role to <strong>Elder Timothy Wang (Treasurer)</strong> or <strong>Senior Pastor</strong>.
            </span>
          </div>
        )}
      </div>

      {/* Global Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
            Total Authorized Budget
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${totalAllocated.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">100% Core</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
            Total Disbursed / Spent
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${totalSpent.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {Math.round((totalSpent / totalAllocated) * 100)}% Disbursed
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
            Committed / Encumbered
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              ${totalCommitted.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {Math.round((totalCommitted / totalAllocated) * 100)}% Encumbered
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
            Remaining Treasury Cash
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${totalRemaining.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              {100 - burnRatePct}% Available
            </span>
          </div>
        </div>
      </div>

      {/* 4 Department Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {budgets.map(deptBudget => {
          const dept = departments.find(d => d.id === deptBudget.departmentId);
          const deptSpent = deptBudget.items.reduce((s, it) => s + it.spentAmount, 0);
          const deptCommitted = deptBudget.items.reduce((s, it) => s + it.committedAmount, 0);
          const deptTotalUsed = deptSpent + deptCommitted;
          const pct = Math.round((deptTotalUsed / deptBudget.totalAllocation) * 100);

          return (
            <div
              key={deptBudget.departmentId}
              onClick={() => setSelectedDeptFilter(deptBudget.departmentId)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedDeptFilter === deptBudget.departmentId
                  ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/30 shadow-md ring-1 ring-indigo-500'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  {dept?.budgetPageRef}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {pct}% Used
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                {deptBudget.departmentName}
              </h4>
              <div className="mt-2 flex items-baseline justify-between font-mono">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  ${deptBudget.totalAllocation.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">
                  ${(deptBudget.totalAllocation - deptTotalUsed).toLocaleString()} left
                </span>
              </div>
              <div className="mt-2 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedDeptFilter}
            onChange={e => setSelectedDeptFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
          >
            <option value="all">All Ministries ($500,500 Total)</option>
            <option value="worship">Worship Ministry ($28,500 P19)</option>
            <option value="mission">Mission Ministry ($231,000 P22)</option>
            <option value="training">Training Ministry ($23,500 P26)</option>
            <option value="service">Service Ministry ($217,500 P30)</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search code, item, or category..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Master Items Ledger Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Consolidated Ledger Entries ({filteredItems.length} Line Items)
          </h4>
          <span className="text-xs text-slate-400">
            Source: Church Planning Part 2 (P1-30)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Ministry</th>
                <th className="px-4 py-3">Description & Documentation</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Allocated</th>
                <th className="px-4 py-3 text-right">Disbursed</th>
                <th className="px-4 py-3 text-right">Committed</th>
                <th className="px-4 py-3 text-right">Balance</th>
                <th className="px-4 py-3 text-center">Page</th>
                {canEditFinance && <th className="px-4 py-3 text-center">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
              {filteredItems.map(item => {
                const bal = item.allocatedAmount - (item.spentAmount + item.committedAmount);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                    <td className="px-4 py-3 font-mono font-semibold text-slate-900 dark:text-white">
                      {item.code}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">
                      {item.departmentName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{item.notes}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                      ${item.allocatedAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      ${item.spentAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-amber-600 dark:text-amber-400">
                      ${item.committedAmount.toLocaleString()}
                    </td>
                    <td className={`px-4 py-3 text-right font-mono font-semibold ${bal >= 0 ? 'text-slate-900 dark:text-white' : 'text-rose-600'}`}>
                      ${bal.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-400 font-medium">
                      {item.pageRef}
                    </td>
                    {canEditFinance && (
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setExpenseModalItem({
                              deptId: item.departmentId,
                              itemId: item.id,
                              name: item.name
                            });
                            setExpenseAmount(500);
                          }}
                          className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-[11px] font-semibold cursor-pointer"
                        >
                          Disburse
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disburse Modal */}
      {expenseModalItem && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white text-xs">
            <h4 className="text-sm font-bold mb-3">Execute Treasury Disbursement</h4>
            <p className="text-slate-500 mb-3">
              Approve payment for:
              <span className="font-semibold block text-slate-900 dark:text-white mt-1">
                {expenseModalItem.name}
              </span>
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-medium mb-1">
                  Disbursement Amount ($ USD)
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={e => setExpenseAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setExpenseModalItem(null)}
                  className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmExpense}
                  className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Approve & Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
