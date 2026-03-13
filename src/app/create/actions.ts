"use server";

export async function verifyPasscode(code: string) {
    const correctPasscode = process.env.ADMIN_PASSCODE;
    // Fallback to testing password if env is missing (for local dev ease, but ideally throw error)
    if (!correctPasscode) {
        console.warn("ADMIN_PASSCODE is not set in environment variables.");
        return false;
    }
    return code === correctPasscode;
}
