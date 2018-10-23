class RemoveStatistics < ActiveRecord::Migration[5.0]
  def change
    if defined?(Statistic)
      drop_table :statistics
    end
  end
end
