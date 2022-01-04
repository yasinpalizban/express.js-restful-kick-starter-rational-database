import express from 'express';

export interface AppInterface {
  listen(): void;
  getServer(): express.Application;
}
