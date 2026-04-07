import { Keypair } from "@solana/web3.js";
import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms"

const kmsClient = new KMSClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const KMS_KEY_ID = process.env.AWS_KMS_KEY!;

//encryting private key 

export async function encryptPrivateKey(privateKey: Uint8Array): Promise<string> {
  const command = new EncryptCommand({
    KeyId: KMS_KEY_ID,
    Plaintext: privateKey
  })

  const response = await kmsClient.send(command);

  if (!response.CiphertextBlob) {
    throw new Error("KMS Encyption failed : No cipherTextBlod Returned")
  }
  //converting back to string from base 64 to store in db
  return Buffer.from(response.CiphertextBlob).toString("base64")
}

//decrypting private key 

export async function decryptPrivateKey(encryptedPrivateKey: string): Promise<Uint8Array> {
  const ciphertextBlob = Buffer.from(encryptedPrivateKey, "base64")

  const command = new DecryptCommand({
    CiphertextBlob: ciphertextBlob
  });

  const response = await kmsClient.send(command);

  if (!response.Plaintext) {
    throw new Error("KMS Decryption failed : No Plaintext Returned")
  }

  return response.Plaintext
}
//generate new keypair

export async function createNewKmsWallet() {

  const keypair = Keypair.generate();
  const encryptedPrivateKey = await encryptPrivateKey(keypair.secretKey)

  return {
    publicKey: keypair.publicKey.toBase58(),
    encryptedPrivateKey,
    keypair
  }
}

export const loadKmsWallet = async (encryptedPrivateKey: string): Promise<Keypair> => {
  const secretKey = await decryptPrivateKey(encryptedPrivateKey);
  return Keypair.fromSecretKey(secretKey)
}