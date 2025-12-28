import { useMemo } from "react";
import Layout from "../components/layout/Layout";
import { useInternships } from "../context/InternshipsContext";
import {
  FunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const { internships } = useInternships();

  // ===== CALCULATE STATS =====
  const stats = useMemo(() => {
    const summary = {
      total: internships.length,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    internships.forEach((item) => {
      if (item.status === "Applied") summary.applied++;
      if (item.status === "Interview") summary.interview++;
      if (item.status === "Offer") summary.offer++;
      if (item.status === "Rejected") summary.rejected++;
    });

    return summary;
  }, [internships]);

  const { total, applied, interview, offer, rejected } = stats;

  // ===== FUNNEL DATA =====
  const funnelData = [
    { name: "Applied", value: applied, fill: "#6366f1" },
    { name: "Interview", value: interview, fill: "#0ea5e9" },
    { name: "Offer", value: offer, fill: "#22c55e" },
  ];

  // ===== CONVERSIONS =====
  const appliedToInterview = applied
    ? ((interview / applied) * 100).toFixed(1)
    : 0;

  const interviewToOffer = interview
    ? ((offer / interview) * 100).toFixed(1)
    : 0;

  const overallSuccess = applied
    ? ((offer / applied) * 100).toFixed(1)
    : 0;

  return (
    <Layout title="Analytics">
      {/* ================= OVERVIEW ================= */}
      <h2 className="analytics-heading">Analytics Overview</h2>

      <div className="analytics-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{total}</p>
        </div>

        <div className="stat-card applied">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>

        <div className="stat-card interview">
          <h3>Interviews</h3>
          <p>{interview}</p>
        </div>

        <div className="stat-card offer">
          <h3>Offers</h3>
          <p>{offer}</p>
        </div>

        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>
      </div>

      {/* ================= FUNNEL ================= */}
      <h2 className="analytics-heading">Hiring Funnel</h2>

      <div className="funnel-section">
        <ResponsiveContainer width="100%" height={240}>
          <FunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={funnelData} />
          </FunnelChart>
        </ResponsiveContainer>

        {applied === 0 && (
          <p className="empty-state">
            📭 Add more internships to unlock analytics.
          </p>
        )}
      </div>

      {/* ================= CONVERSIONS ================= */}
      <h2 className="analytics-heading">Conversion Performance</h2>

      <div className="conversion-grid">
        <div className="conversion-card">
          <h4>Applied → Interview</h4>
          <p>{appliedToInterview}%</p>
        </div>

        <div className="conversion-card">
          <h4>Interview → Offer</h4>
          <p>{interviewToOffer}%</p>
        </div>

        <div className="conversion-card highlight">
          <h4>Overall Success</h4>
          <p>{overallSuccess}%</p>
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}
      <h2 className="analytics-heading">Smart Insights</h2>

      <div className="insights-box">
        {total === 0 && (
          <p>⚠️ Start adding internships to generate insights.</p>
        )}

        {applied > 0 && interview === 0 && (
          <p>🔴 No interviews yet — improve resume quality or targeting.</p>
        )}

        {interview > 0 && offer === 0 && (
          <p>🟡 Interviews happening but no offers — focus on interview prep.</p>
        )}

        {offer > 0 && (
          <p>🟢 Offers received — your application strategy is working.</p>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
