import json
import random

INPUT_FILE = "members.json"        # your converted JSON
OUTPUT_FILE = "members_with_otp.json"

# --------------------------------------------------
# Load JSON
# --------------------------------------------------
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    members = json.load(f)

total_members = len(members)

# --------------------------------------------------
# Safety check
# --------------------------------------------------
if total_members > 9000:
    raise ValueError("❌ Cannot generate unique 4-digit OTPs for more than 9000 members")

# --------------------------------------------------
# Generate UNIQUE 4-digit OTPs
# --------------------------------------------------
unique_otps = random.sample(range(1000, 10000), total_members)

# --------------------------------------------------
# Assign OTPs
# --------------------------------------------------
for member, otp in zip(members, unique_otps):
    member["otp_password"] = str(otp)

# --------------------------------------------------
# Save updated JSON
# --------------------------------------------------
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(members, f, indent=2, ensure_ascii=False)

print(f"✅ OTPs added successfully → {OUTPUT_FILE}")
