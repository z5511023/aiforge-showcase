import { useState, useEffect, useCallback } from 'react'

const ADMIN_KEY = 'aiforge_admin_auth'
const DELETED_KEY = 'aiforge_deleted_ids'

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_KEY)
    if (stored === 'true') {
      setIsAdmin(true)
    }
  }, [])

  const login = useCallback((password: string): boolean => {
    if (password === 'aiforge2025') {
      localStorage.setItem(ADMIN_KEY, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY)
    setIsAdmin(false)
  }, [])

  return { isAdmin, login, logout }
}

export function useDeletedPrototypes() {
  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(DELETED_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const deleteProto = useCallback((id: string) => {
    setDeletedIds(prev => {
      const next = [...prev, id]
      localStorage.setItem(DELETED_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const restoreProto = useCallback((id: string) => {
    setDeletedIds(prev => {
      const next = prev.filter(did => did !== id)
      localStorage.setItem(DELETED_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isDeleted = useCallback((id: string) => {
    return deletedIds.includes(id)
  }, [deletedIds])

  const clearAll = useCallback(() => {
    localStorage.removeItem(DELETED_KEY)
    setDeletedIds([])
  }, [])

  return { deletedIds, deleteProto, restoreProto, isDeleted, clearAll }
}
