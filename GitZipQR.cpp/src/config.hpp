#ifndef GITZIPQR_CONFIG_H
#define GITZIPQR_CONFIG_H

#include <string>
#include <chrono>
#include <ctime>

namespace gzqr_config {

// ── Project / branding ─────────────────────────────────────────────────
inline constexpr const char* kProjectName    = "GitZipQR.cpp";
inline constexpr const char* kProjectVersion = "4.2-secure";

// ── QR layout defaults ────────────────────────────────────────────────
inline constexpr char kDefaultQRECL    = 'L';  // L/M/Q/H
inline constexpr int  kDefaultQRVersion= 40;   // 1..40
inline constexpr int  kDefaultQRMargin = 1;
inline constexpr int  kDefaultQRScale  = 8;

// ── Console cosmetics ─────────────────────────────────────────────────
inline constexpr bool kPrintProgressCounters = true;

// ── Default password (fallback!) ──────────────────────────────────────
inline std::string getDefaultPassword()
{
  auto now = std::chrono::system_clock::now();
  std::time_t t = std::chrono::system_clock::to_time_t(now);
  char date[32];
  std::strftime(date, sizeof(date), "%d%m%Y", std::localtime(&t)); // DDMMYYYY
  return std::string("GitZipQR.cpp#") + date;
}

} // namespace gzqr_config

#endif // GITZIPQR_CONFIG_H
