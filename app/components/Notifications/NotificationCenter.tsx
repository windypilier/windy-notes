"use client"

import { useState, useEffect } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  action?: {
    label: string
    onClick: () => void
  }
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'ℹ️'
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'unread'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Non lues
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm text-gray-600 hover:text-pink-600"
          >
            Tout marquer comme lu
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 text-sm text-gray-600 hover:text-pink-600"
          >
            Effacer tout
          </button>
        </div>
      </div>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {notifications
          .filter(notif => filter === 'all' || !notif.read)
          .map(notification => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 
                         ${!notification.read ? 'border-l-4 border-pink-600' : ''}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">
                  {getNotificationIcon(notification.type)}
                </span>
                
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{notification.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                    
                    <div className="flex gap-2">
                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="text-sm text-pink-600 hover:text-pink-700"
                        >
                          {notification.action.label}
                        </button>
                      )}
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-gray-600 hover:text-pink-600"
                        >
                          Marquer comme lu
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-sm text-gray-600 hover:text-pink-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {notifications.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            Aucune notification
          </div>
        )}
      </div>
    </div>
  )
}
