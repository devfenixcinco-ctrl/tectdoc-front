import { api } from './api'
import { clientId } from './config'

// Registra en el backend el consentimiento explícito de un formulario (LGPD-03).
// Devuelve { id, accepted_at, policy_version } para asociarlo al envío o lead.
export async function recordConsent({ purpose, email = null, reference = null }) {
  const response = await api.post(`/consents/${clientId()}`, {
    accepted: true,
    purpose,
    email,
    reference
  })

  return response.data
}
