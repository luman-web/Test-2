<template>
  <div class="wallet-card">
    <div class="wallet-header">
      <div class="wallet-info">
        <div class="wallet-label">Main wallet</div>
        <div class="wallet-address">{{ walletAddress }}</div>
      </div>
      <div class="copy-icon">
        <i class="fas fa-copy"></i>
      </div>
    </div>
    
    <div class="wallet-balance">
      ${{ balance }}
    </div>
    
    <div class="wallet-tokens">
      <div class="token-icons">
        <div class="token-icon bitcoin">₿</div>
        <div class="token-icon ethereum">Ξ</div>
        <div class="token-icon other">◈</div>
        <div class="token-count">+{{ additionalTokens }}</div>
      </div>
      <div class="percentage-gain">
        +{{ percentageGain }}%
      </div>
    </div>
    
    <div class="wallet-actions">
      <div class="action-btn" @click="sendAction">
        <i class="fas fa-arrow-up-left"></i>
      </div>
      <div class="action-btn" @click="receiveAction">
        <i class="fas fa-arrow-up-right"></i>
      </div>
      <div class="action-btn" @click="refreshAction">
        <i class="fas fa-sync-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      walletAddress: '0x1dded...ac633',
      balance: '700',
      additionalTokens: 8,
      percentageGain: '12.53'
    }
  },
  methods: {
    sendAction() {
      console.log('Send action clicked');
    },
    receiveAction() {
      console.log('Receive action clicked');
    },
    refreshAction() {
      console.log('Refresh action clicked');
    }
  }
}
</script>

<style scoped>
.wallet-card {
  background: #1a1a1a;
  border-radius: 20px;
  padding: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.wallet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.wallet-info {
  flex: 1;
}

.wallet-label {
  color: #888;
  font-size: 14px;
  margin-bottom: 4px;
}

.wallet-address {
  color: #ccc;
  font-size: 16px;
  font-weight: 500;
}

.copy-icon {
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
}

.copy-icon:hover {
  color: #888;
}

.wallet-balance {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
}

.wallet-tokens {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.token-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.token-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.token-icon.bitcoin {
  background: #f7931a;
  color: white;
}

.token-icon.ethereum {
  background: #627eea;
  color: white;
}

.token-icon.other {
  background: #e74c3c;
  color: white;
}

.token-count {
  color: #888;
  font-size: 14px;
  margin-left: 4px;
}

.percentage-gain {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.wallet-actions {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.action-btn {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  color: #888;
}

.action-btn:hover {
  background: #444;
  color: #ccc;
}

.action-btn i {
  font-size: 16px;
}
</style>