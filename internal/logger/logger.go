package logger

import (
	"context"

	"github.com/bimmerbailey/rill/internal/utils"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

// New returns a log entry with the reqID and userID fields populated if they exist
func New(ctx context.Context) *log.Entry {
	entry := log.NewEntry(log.StandardLogger())
	if reqID, ok := ctx.Value(utils.ReqIDKey).(uuid.UUID); ok {
		entry = entry.WithField("reqID", reqID)
	}
	if userID, ok := ctx.Value(utils.UserIDKey).(uuid.UUID); ok {
		entry = entry.WithField("userID", userID)
	}
	return entry
}
