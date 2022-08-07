/**
 * Copyright (c) 2022 Samsung Electronics Co., Ltd.
 * All rights reserved.
 *
 * This software is a confidential and proprietary information of Samsung
 * Electronics, Inc. ("Confidential Information").  You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Samsung Electronics.
 */

import { existsSync, readlinkSync, symlinkSync, unlinkSync } from 'fs';
import { resolve } from 'path';

export class SymbolicLinksManager {
  private static readonly GET_MESSAGE_LAMBDA_PATH = '../../src/lambdas/get-message/common';
  private static readonly COMMON_NODE_LAMBDA_PATH = '../../src/common';

  private readonly nodeTarget = resolve(__dirname, SymbolicLinksManager.COMMON_NODE_LAMBDA_PATH);
  private readonly systemNodeSources = [
    resolve(__dirname, SymbolicLinksManager.GET_MESSAGE_LAMBDA_PATH)
  ];

  public createSymbolicLinks(): void {
    this.createLinks(this.systemNodeSources, this.nodeTarget);
  }

  private tryToUnlinkPreviousSymbolicLink(sourcePath: string): void {
    try {
      if (readlinkSync(sourcePath)) {
        unlinkSync(sourcePath);
      }
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return;
      }

      throw error;
    }
  }

  private createLinks(systemSources: string[], target: string): void {
    const sources = [...systemSources];
    const dirTargetKey = 'dir';

    for (const sourcePath of sources) {
      if (!existsSync(sourcePath)) {
        this.tryToUnlinkPreviousSymbolicLink(sourcePath);
        symlinkSync(target, sourcePath, dirTargetKey);
      }
    }
  }
}

void (() => {
  new SymbolicLinksManager().createSymbolicLinks();
})();
